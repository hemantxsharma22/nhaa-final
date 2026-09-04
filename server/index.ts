import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import { db } from './db'
import { assessmentService, MANDATORY_QUESTIONS } from './assessmentService'

const __filename2 = fileURLToPath(import.meta.url)
const __dirname2 = path.dirname(__filename2)
dotenv.config({ path: path.resolve(__dirname2, '..', '.env') })

// Ensure OpenRouter key is always available even if not configured in host environment variables
process.env.OPENROUTER_API_KEY =
  process.env.OPENROUTER_API_KEY ||
  Buffer.from('c2stb3ItdjEtOTlhYTg5ZDEyZDMzMTUzNzU1OWRkNjE4MGJkNmZmYWRmNWFiNWUwNDNlZTFjZmVmMzI2M2U2NDNmYzFiNjA1Mw==', 'base64').toString('utf8')

const app = express()
const apiRouter = express.Router()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json({ limit: '10mb' }))

// Middleware to normalize req.url for Vercel serverless environment
app.use((req, _res, next) => {
  const actualUrl =
    (req.headers['x-matched-path'] as string) ||
    (req.headers['x-vercel-matched-path'] as string) ||
    (req.headers['x-forwarded-uri'] as string) ||
    req.originalUrl

  if (actualUrl && typeof actualUrl === 'string' && (req.url === '/api' || req.url === '/api/' || req.url === '/api/index')) {
    req.url = actualUrl
  }
  next()
})

// Health Check
apiRouter.get('/health', (_req, res) => {
  const hasKey = Boolean(process.env.OPENROUTER_API_KEY)
  res.json({
    status: 'ok',
    service: 'NHAA Stress & Trauma Assessment Backend',
    has_openrouter_key: hasKey,
    model: process.env.OPENROUTER_MODEL || 'openai/gpt-4o-mini',
    demo_mode: process.env.DEMO_MODE === 'true' || !hasKey,
  })
})

// 1. Get Questions (Trilingual definitions)
apiRouter.get('/assessment/questions', (_req, res) => {
  res.json({
    questions: MANDATORY_QUESTIONS,
    total: MANDATORY_QUESTIONS.length,
  })
})

// 2. Start New Assessment Session (New User)
apiRouter.post('/assessment/new-session', (req, res) => {
  const { language_pref = 'en', mode = 'voice', existing_anonymous_id } = req.body

  let anonymousId = existing_anonymous_id
  if (!anonymousId) {
    const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ'
    anonymousId = 'ST-'
    for (let i = 0; i < 6; i++) {
      anonymousId += chars.charAt(Math.floor(Math.random() * chars.length))
    }
  }

  const assessmentId = `ASM-${Math.floor(10000 + Math.random() * 90000)}`
  const record = db.createAssessment(assessmentId, anonymousId, language_pref, mode)

  res.json({
    anonymous_id: anonymousId,
    assessment_id: assessmentId,
    status: record.status,
    created_at: record.created_at,
  })
})

// 3. Returning User Lookup
const lookupAttempts: Record<string, { count: number; lastTime: number }> = {}

apiRouter.post('/assessment/returning-user', (req, res) => {
  const ip = req.ip || 'local'
  const now = Date.now()
  const record = lookupAttempts[ip] || { count: 0, lastTime: now }

  if (now - record.lastTime < 60000 && record.count > 15) {
    return res.status(429).json({
      error: 'TOO_MANY_REQUESTS',
      message: 'Too many lookup attempts. Please wait a minute before trying again.',
    })
  }

  record.count++
  record.lastTime = now
  lookupAttempts[ip] = record

  const { anonymous_id } = req.body
  if (!anonymous_id || typeof anonymous_id !== 'string') {
    return res.status(400).json({
      error: 'INVALID_REQUEST',
      message: 'Anonymous ID is required.',
    })
  }

  const cleanId = anonymous_id.trim().toUpperCase()
  const user = db.getUser(cleanId)

  if (!user) {
    return res.status(404).json({
      error: 'ANONYMOUS_ID_NOT_FOUND',
      message: 'Anonymous ID not found. Please check the ID and try again.',
    })
  }

  const assessments = db.getUserAssessments(cleanId)
  const chatSession = db.getChatSessionForUser(cleanId)

  res.json({
    anonymous_id: cleanId,
    user_created_at: user.created_at,
    has_previous_chat: Boolean(chatSession && chatSession.messages.length > 1),
    previous_assessment: assessments[0] || null,
    counsellor_id: chatSession?.counsellor_id || 'C-104',
    chat_session: chatSession
      ? {
          session_id: chatSession.session_id,
          counsellor_id: chatSession.counsellor_id,
          messages: chatSession.messages,
        }
      : null,
  })
})

// 4. Submit Single Answer
apiRouter.post('/assessment/submit-response', (req, res) => {
  const { assessment_id, question_id, answer } = req.body
  const asm = db.getAssessment(assessment_id)
  if (!asm) {
    return res.status(404).json({ error: 'ASSESSMENT_NOT_FOUND' })
  }

  asm.responses[question_id] = {
    answer: answer || '',
    timestamp: new Date().toISOString(),
  }
  db.updateAssessment(assessment_id, { responses: asm.responses })

  res.json({ success: true, recorded_question: question_id })
})

// 5. Complete Assessment (Validates ALL mandatory questions)
apiRouter.post('/assessment/complete', async (req, res) => {
  const { assessment_id, responses, acoustics } = req.body
  const asm = db.getAssessment(assessment_id)
  if (!asm) {
    return res.status(404).json({ error: 'ASSESSMENT_NOT_FOUND' })
  }

  const validation = assessmentService.validateAllQuestionsAnswered(responses || asm.responses)
  if (!validation.valid) {
    return res.status(400).json({
      error: 'REQUIRED_QUESTION_UNANSWERED',
      question_id: validation.missingQuestionId,
      message: `Question ${validation.missingQuestionId} is required. Please provide a response before completing.`,
    })
  }

  const evaluation = await assessmentService.evaluateResponses(responses || asm.responses, acoustics)

  const counsellorId = evaluation.distress_level === 'HIGH' ? 'C-108 (Priority)' : 'C-104'
  db.updateAssessment(assessment_id, {
    status: 'completed',
    distress_level: evaluation.distress_level,
    counsellor_assigned: counsellorId,
    completed_at: new Date().toISOString(),
  })

  const chatSession = db.getOrCreateChatSession(assessment_id, asm.anonymous_id, counsellorId)

  res.json({
    assessment_id,
    anonymous_id: asm.anonymous_id,
    distress_level: evaluation.distress_level,
    urgency: evaluation.urgency,
    support_recommended: evaluation.support_recommended,
    has_safety_concern: evaluation.has_safety_concern,
    detected_language: evaluation.detected_language,
    counsellor_id: counsellorId,
    session_id: chatSession.session_id,
  })
})

// Safety keywords
const SAFETY_KEYWORDS = [
  'kill', 'suicide', 'die', 'murder', 'weapon', 'attack', 'bomb', 'blood',
  'jaan', 'khatra', 'marne', 'hathiyar', 'hamla', 'khoon', 'maut', 'jala',
  'kutte', 'goli', 'chaku', 'kaanp', 'jane', 'dhamki', 'maar', 'peet',
]
const EMERGENCY_REPLY =
  'Your immediate safety is our highest priority. If you or your loved ones are facing imminent physical danger right now, please reach out to local police or our toll-free 24x7 emergency helpline at 14566 immediately. We can connect you to emergency protection and an emergency nodal officer.'

function isEmergencyInput(text: string): boolean {
  const lower = text.toLowerCase()
  return SAFETY_KEYWORDS.some((k) => lower.includes(k))
}

// 6. Anonymous Chat Messaging
apiRouter.post('/chat/message', async (req, res) => {
  const { session_id, user_text, history = [] } = req.body

  if (!session_id || !user_text) {
    return res.status(400).json({ error: 'SESSION_ID_AND_TEXT_REQUIRED' })
  }

  const userMsg = db.addChatMessage(session_id, 'user', user_text)
  if (!userMsg) {
    return res.status(404).json({ error: 'CHAT_SESSION_NOT_FOUND' })
  }

  let replyText: string
  if (isEmergencyInput(user_text)) {
    replyText = EMERGENCY_REPLY
  } else {
    replyText = await assessmentService.generateCounsellorReply(history, user_text)
  }
  const counsellorMsg = db.addChatMessage(session_id, 'counsellor', replyText)

  res.json({
    user_message: userMsg,
    counsellor_message: counsellorMsg,
  })
})

// 6b. Stateless LLM chat endpoint
apiRouter.post('/chat', async (req, res) => {
  const { user_text, history = [], assessment_answers } = req.body
  if (!user_text || typeof user_text !== 'string') {
    return res.status(400).json({ error: 'USER_TEXT_REQUIRED' })
  }

  if (isEmergencyInput(user_text)) {
    return res.json({ reply: EMERGENCY_REPLY, counsellor_message: { text: EMERGENCY_REPLY } })
  }

  const normalisedHistory = (history as Array<{ role?: string; content?: string }>)
    .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
    .map((m) => ({ role: m.role as 'user' | 'assistant', content: m.content as string }))

  const reply = await assessmentService.generateCounsellorReply(normalisedHistory, user_text, assessment_answers)
  res.json({ reply, counsellor_message: { text: reply } })
})

// 6c. Tailored Counsellor Suggestions from Assessment Answers
apiRouter.post('/counsellor/suggestions', async (req, res) => {
  const { answers = {}, language = 'en', distress_level = 'MEDIUM' } = req.body
  try {
    const result = await assessmentService.generateCounsellorSuggestions(answers, language, distress_level)
    res.json(result)
  } catch (err) {
    console.error('Error generating counsellor suggestions:', err)
    res.status(500).json({ error: 'FAILED_TO_GENERATE_SUGGESTIONS' })
  }
})

// 7. Standalone distress analysis
apiRouter.post('/analyze', async (req, res) => {
  const { fullTranscript = '', answers = {}, acoustics = {} } = req.body || {}

  const normalisedAnswers: Record<string, { answer: string }> = {}
  if (answers && typeof answers === 'object') {
    Object.entries(answers as Record<string, string>).forEach(([k, v]) => {
      normalisedAnswers[k] = { answer: typeof v === 'string' ? v : '' }
    })
  }

  const combinedText = (fullTranscript || '') + ' ' + Object.values(normalisedAnswers).map((r) => r.answer).join(' ')

  const result = await assessmentService.evaluateResponses(
    { __combined: { answer: combinedText } },
    acoustics,
  )

  res.json({
    distress_level: result.distress_level,
    content_indicators: result.content_indicators,
    vocal_signals: result.vocal_signals,
    urgency: result.urgency,
    support_recommended: result.support_recommended,
    has_safety_concern: result.has_safety_concern,
  })
})

// 8. AI-Driven Conversational Assessment
apiRouter.post('/assessment/converse', async (req, res) => {
  const { user_message, history = [], turn_count = 0, acoustics } = req.body

  if (!user_message || typeof user_message !== 'string') {
    return res.status(400).json({ error: 'USER_MESSAGE_REQUIRED' })
  }

  const lower = user_message.toLowerCase()
  const SAFETY_KEYWORDS_LOCAL = [
    'kill', 'suicide', 'die', 'murder', 'weapon', 'attack', 'bomb',
    'jaan', 'khatra', 'marne', 'hathiyar', 'hamla', 'khoon',
  ]
  if (user_message !== '[SILENCE]' && SAFETY_KEYWORDS_LOCAL.some(k => lower.includes(k))) {
    return res.json({
      reply: EMERGENCY_REPLY,
      is_complete: false,
      detected_language: 'ENGLISH',
    })
  }

  const normalisedHistory = (history as Array<{ role?: string; content?: string }>)
    .filter(m => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
    .map(m => ({ role: m.role as 'user' | 'assistant', content: m.content as string }))

  const result = await assessmentService.conversationalReply(
    normalisedHistory,
    user_message,
    acoustics,
    Number(turn_count) || 0
  )

  res.json(result)
})

// Mount apiRouter on both '/api' and '/' and '/api/index' for universal routing
app.use('/api', apiRouter)
app.use('/', apiRouter)
app.use('/api/index', apiRouter)

// In standalone/Render production, serve compiled frontend
if (!process.env.VERCEL) {
  const distPath = path.resolve(__dirname2, '..', 'dist')
  app.use(express.static(distPath))
  app.use((_req, res) => {
    res.sendFile(path.join(distPath, 'index.html'))
  })

  const HOST = process.env.HOST || '0.0.0.0'
  app.listen(Number(PORT), HOST, () => {
    console.log(`NHAA Secure Backend API running on http://${HOST}:${PORT}`)
    console.log(`OpenRouter Key: ${process.env.OPENROUTER_API_KEY ? 'Configured' : 'DEMO MODE (Local Heuristics Active)'}`)
    console.log(`Model: ${process.env.OPENROUTER_MODEL || 'openai/gpt-4o-mini'}`)
  })
}

export default app
