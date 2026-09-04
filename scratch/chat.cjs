var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// api/chat.ts
var chat_exports = {};
__export(chat_exports, {
  default: () => handler
});
module.exports = __toCommonJS(chat_exports);

// server/assessmentService.ts
var DEFAULT_OPENROUTER_KEY = process.env.OPENROUTER_API_KEY || Buffer.from("c2stb3ItdjEtOTlhYTg5ZDEyZDMzMTUzNzU1OWRkNjE4MGJkNmZmYWRmNWFiNWUwNDNlZTFjZmVmMzI2M2U2NDNmYzFiNjA1Mw==", "base64").toString("utf8");
function getOpenRouterApiKey() {
  return process.env.OPENROUTER_API_KEY || DEFAULT_OPENROUTER_KEY || "";
}
var MANDATORY_QUESTIONS = [
  {
    question_id: "Q1",
    question_order: 1,
    question_text_en: "Can you tell us what has been troubling you recently?",
    question_text_hi: "\u0915\u094D\u092F\u093E \u0906\u092A \u092C\u0924\u093E \u0938\u0915\u0924\u0947 \u0939\u0948\u0902 \u0915\u093F \u0939\u093E\u0932 \u0939\u0940 \u092E\u0947\u0902 \u0906\u092A\u0915\u094B \u0915\u093F\u0938 \u092C\u093E\u0924 \u0938\u0947 \u092A\u0930\u0947\u0936\u093E\u0928\u0940 \u0939\u094B \u0930\u0939\u0940 \u0939\u0948?",
    question_text_hinglish: "Kya aap bata sakte hain ki recently aapko kis baat se problem ho rahi hai?",
    required: true,
    response_type: "audio_or_text",
    active: true
  },
  {
    question_id: "Q2",
    question_order: 2,
    question_text_en: "How has this situation affected your daily life and activities?",
    question_text_hi: "\u0907\u0938 \u0938\u094D\u0925\u093F\u0924\u093F \u0928\u0947 \u0906\u092A\u0915\u0947 \u0926\u0948\u0928\u093F\u0915 \u091C\u0940\u0935\u0928, \u0928\u0940\u0902\u0926 \u092F\u093E \u0915\u093E\u092E \u0915\u094B \u0915\u0948\u0938\u0947 \u092A\u094D\u0930\u092D\u093E\u0935\u093F\u0924 \u0915\u093F\u092F\u093E \u0939\u0948?",
    question_text_hinglish: "Is situation ne aapki daily life, neend ya routine ko kaise affect kiya hai?",
    required: true,
    response_type: "audio_or_text",
    active: true
  },
  {
    question_id: "Q3",
    question_order: 3,
    question_text_en: "Have you experienced any intimidation, threats, or discrimination from anyone?",
    question_text_hi: "\u0915\u094D\u092F\u093E \u0906\u092A\u0928\u0947 \u0915\u093F\u0938\u0940 \u0938\u0947 \u0915\u094B\u0908 \u0927\u092E\u0915\u0940, \u092D\u0947\u0926\u092D\u093E\u0935 \u092F\u093E \u0926\u092C\u093E\u0935 \u0915\u093E \u0905\u0928\u0941\u092D\u0935 \u0915\u093F\u092F\u093E \u0939\u0948?",
    question_text_hinglish: "Kya aapne kisi se koi threat, discrimination, caste slur ya pressure experience kiya hai?",
    required: true,
    response_type: "audio_or_text",
    active: true
  },
  {
    question_id: "Q4",
    question_order: 4,
    question_text_en: "How is your emotional state feeling right now as you reflect on this?",
    question_text_hi: "\u0907\u0938 \u092C\u093E\u0930\u0947 \u092E\u0947\u0902 \u0938\u094B\u091A\u0924\u0947 \u0938\u092E\u092F \u0906\u092A \u0905\u092D\u0940 \u092D\u093E\u0935\u0928\u093E\u0924\u094D\u092E\u0915 \u0930\u0942\u092A \u0938\u0947 \u0915\u0948\u0938\u093E \u092E\u0939\u0938\u0942\u0938 \u0915\u0930 \u0930\u0939\u0947 \u0939\u0948\u0902?",
    question_text_hinglish: "Is baare mein sochte waqt aap emotionally kaisa feel kar rahe hain?",
    required: true,
    response_type: "audio_or_text",
    active: true
  },
  {
    question_id: "Q5",
    question_order: 5,
    question_text_en: "Have you felt supported by anyone around you, or do you feel isolated in this situation?",
    question_text_hi: "\u0915\u094D\u092F\u093E \u0906\u092A\u0915\u094B \u0905\u092A\u0928\u0947 \u0906\u0938-\u092A\u093E\u0938 \u0915\u093F\u0938\u0940 \u0915\u093E \u0938\u0939\u093E\u0930\u093E \u092E\u0939\u0938\u0942\u0938 \u0939\u094B \u0930\u0939\u093E \u0939\u0948, \u092F\u093E \u0906\u092A \u0905\u0915\u0947\u0932\u093E\u092A\u0928 \u092E\u0939\u0938\u0942\u0938 \u0915\u0930 \u0930\u0939\u0947 \u0939\u0948\u0902?",
    question_text_hinglish: "Kya aapko kisi ka support mil raha hai, ya aap is situation mein isolated feel kar rahe hain?",
    required: true,
    response_type: "audio_or_text",
    active: true
  },
  {
    question_id: "Q6",
    question_order: 6,
    question_text_en: "Are you currently worried about immediate physical safety for yourself or your family?",
    question_text_hi: "\u0915\u094D\u092F\u093E \u0906\u092A \u0905\u092D\u0940 \u0905\u092A\u0928\u0947 \u092F\u093E \u0905\u092A\u0928\u0947 \u092A\u0930\u093F\u0935\u093E\u0930 \u0915\u0940 \u0936\u093E\u0930\u0940\u0930\u093F\u0915 \u0938\u0941\u0930\u0915\u094D\u0937\u093E \u0915\u094B \u0932\u0947\u0915\u0930 \u091A\u093F\u0902\u0924\u093F\u0924 \u0939\u0948\u0902?",
    question_text_hinglish: "Kya aap abhi apne ya apni family ki physical safety ko lekar worried hain?",
    required: true,
    response_type: "audio_or_text",
    active: true
  },
  {
    question_id: "Q7",
    question_order: 7,
    question_text_en: "Is there anything else you want to share about what would help you feel secure right now?",
    question_text_hi: "\u0915\u094D\u092F\u093E \u0915\u0941\u091B \u0914\u0930 \u0939\u0948 \u091C\u094B \u0906\u092A \u0938\u093E\u091D\u093E \u0915\u0930\u0928\u093E \u091A\u093E\u0939\u0924\u0947 \u0939\u0948\u0902 \u091C\u093F\u0938\u0938\u0947 \u0906\u092A\u0915\u094B \u0905\u092D\u0940 \u0938\u0941\u0930\u0915\u094D\u0937\u093F\u0924 \u092E\u0939\u0938\u0942\u0938 \u0939\u094B?",
    question_text_hinglish: "Kya kuch aur hai jo aap share karna chahte hain jisse aap secure feel karein?",
    required: true,
    response_type: "audio_or_text",
    active: true
  }
];
var AssessmentService = class {
  // Mandatory questions validation
  validateAllQuestionsAnswered(responses) {
    for (const q of MANDATORY_QUESTIONS) {
      if (q.required) {
        const resp = responses[q.question_id];
        if (!resp || !resp.answer || resp.answer.trim().length < 2) {
          return { valid: false, missingQuestionId: q.question_id };
        }
      }
    }
    return { valid: true };
  }
  // Language & Hinglish Detection
  detectLanguage(text) {
    if (!text || text.trim().length === 0) return { language: "ENGLISH", confidence: 0.5 };
    const hasDevanagari = /[\u0900-\u097F]/.test(text);
    const hinglishMarkers = ["hai", "hain", "mein", "mera", "meri", "mujhe", "karna", "pad", "raha", "rahi", "kuch", "nahi", "bahut", "log", "karte", "hona", "kyun", "kya"];
    const lower = text.toLowerCase();
    let hinglishScore = 0;
    hinglishMarkers.forEach((m) => {
      if (new RegExp(`\\b${m}\\b`, "i").test(lower)) hinglishScore++;
    });
    if (hasDevanagari && hinglishScore > 0) return { language: "MIXED", confidence: 0.9 };
    if (hasDevanagari) return { language: "HINDI", confidence: 0.95 };
    if (hinglishScore >= 1) return { language: "HINGLISH", confidence: 0.92 };
    return { language: "ENGLISH", confidence: 0.88 };
  }
  // Dual-Stream Evaluation using Backend Secret Key or Local Heuristic
  async evaluateResponses(responses, acoustics) {
    const apiKey = getOpenRouterApiKey();
    const isDemoMode = process.env.DEMO_MODE === "true" || !apiKey;
    const combinedText = Object.values(responses).map((r) => r.answer).join(" ");
    const langDetect = this.detectLanguage(combinedText);
    if (!isDemoMode && apiKey) {
      try {
        const aiResult = await this.evaluateWithOpenRouter(combinedText, acoustics, apiKey);
        if (aiResult) {
          aiResult.detected_language = langDetect.language;
          aiResult.language_confidence = langDetect.confidence;
          return aiResult;
        }
      } catch (err) {
        console.warn("OpenRouter evaluation failed, using resilient heuristic:", err);
      }
    }
    return this.evaluateLocalDualStream(combinedText, acoustics, langDetect.language, langDetect.confidence);
  }
  evaluateLocalDualStream(combinedText, acoustics = {}, language, confidence) {
    const text = combinedText.toLowerCase();
    const highRiskTerms = ["kill", "suicide", "die", "murder", "blood", "weapon", "mob", "burn", "lynch", "marne", "jaan", "khatra", "hathiyar"];
    const violenceTerms = ["beat", "attack", "hit", "assault", "slap", "injure", "hospital", "fracture", "maara", "peeta", "hamla"];
    const threatTerms = ["threat", "threaten", "scared", "afraid", "intimidate", "harass", "stalk", "fear", "darr", "dhamki", "pareshan"];
    const discriminationTerms = ["caste", "untouchable", "dalit", "adivasi", "boycott", "temple", "well", "water", "abused", "insult", "bhedbhav", "chhuachhut", "gaali"];
    const contentIndicators = [];
    let highRiskCount = 0;
    let moderateRiskCount = 0;
    highRiskTerms.forEach((t) => {
      if (text.includes(t)) {
        highRiskCount++;
        if (!contentIndicators.includes("safety_threat")) contentIndicators.push("safety_threat");
      }
    });
    violenceTerms.forEach((t) => {
      if (text.includes(t)) {
        highRiskCount++;
        if (!contentIndicators.includes("violence")) contentIndicators.push("violence");
      }
    });
    threatTerms.forEach((t) => {
      if (text.includes(t)) {
        moderateRiskCount++;
        if (!contentIndicators.includes("harassment")) contentIndicators.push("harassment");
        if (!contentIndicators.includes("fear")) contentIndicators.push("fear");
      }
    });
    discriminationTerms.forEach((t) => {
      if (text.includes(t)) {
        moderateRiskCount++;
        if (!contentIndicators.includes("discrimination")) contentIndicators.push("discrimination");
      }
    });
    const pauseCount = acoustics.pauseCount || 0;
    const vocalSignals = {
      speech_rate_change: Boolean(acoustics.speakingRate && (acoustics.speakingRate < 90 || acoustics.speakingRate > 150)),
      increased_pauses: pauseCount >= 3,
      pitch_variation: Boolean(acoustics.pitchVariation || pauseCount >= 2),
      voice_tremor: acoustics.voiceIntensity === "tremor"
    };
    const hasSafetyConcern = highRiskCount >= 1 || text.includes("kill") || text.includes("jaan ka khatra");
    let distressLevel = "LOW";
    let urgency = "low";
    if (hasSafetyConcern || highRiskCount >= 2 || moderateRiskCount >= 2 && (vocalSignals.increased_pauses || vocalSignals.voice_tremor)) {
      distressLevel = "HIGH";
      urgency = "high";
    } else if (moderateRiskCount >= 1 || vocalSignals.increased_pauses || text.length > 50) {
      distressLevel = "MEDIUM";
      urgency = "moderate";
    }
    return {
      distress_level: distressLevel,
      content_indicators: contentIndicators.length > 0 ? contentIndicators : ["mild_worry"],
      vocal_signals: vocalSignals,
      detected_language: language,
      language_confidence: confidence,
      urgency,
      support_recommended: distressLevel !== "LOW",
      has_safety_concern: hasSafetyConcern
    };
  }
  async evaluateWithOpenRouter(text, acoustics, apiKey) {
    const prompt = `
You are a confidential trauma assessment engine for India's National Helpline Against Atrocities (NHAA).
Analyze the citizen's responses (which may be in English, Hindi, or Roman-script Hinglish like "Mujhe college mein discrimination face karna pad raha hai").

Text:
"${text}"

Acoustics:
- Pauses: ${acoustics?.pauseCount || 0}
- Speaking Rate: ${acoustics?.speakingRate || 120} wpm

Determine hidden distress level (LOW, MEDIUM, HIGH). Return valid JSON:
{
  "distress_level": "LOW" | "MEDIUM" | "HIGH",
  "content_indicators": ["harassment", "discrimination", "fear", "threats"],
  "vocal_signals": {
    "speech_rate_change": boolean,
    "increased_pauses": boolean,
    "pitch_variation": boolean
  },
  "urgency": "low" | "moderate" | "high",
  "support_recommended": boolean,
  "has_safety_concern": boolean
}
`;
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        "HTTP-Referer": "https://nhaa.local",
        "X-Title": "NHAA Assessment"
      },
      body: JSON.stringify({
        model: process.env.OPENROUTER_MODEL || "openai/gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" },
        temperature: 0.2
      })
    });
    if (!res.ok) {
      console.warn("OpenRouter analyze HTTP", res.status, await res.text().catch(() => ""));
      return null;
    }
    const data = await res.json();
    const content = data?.choices?.[0]?.message?.content;
    if (!content) return null;
    return JSON.parse(content);
  }
  // Counsellor Response Generator (Server-Side)
  async generateCounsellorReply(history, userText, assessmentAnswers) {
    const apiKey = getOpenRouterApiKey();
    const isDemoMode = process.env.DEMO_MODE === "true" || !apiKey;
    let assessmentContextStr = "";
    if (assessmentAnswers && Object.keys(assessmentAnswers).length > 0) {
      assessmentContextStr = `
Citizen's Prior Assessment Answers:
` + Object.entries(assessmentAnswers).map(([q, ans]) => `- ${q}: "${ans}"`).join("\n");
    }
    if (!isDemoMode && apiKey) {
      try {
        const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
            "HTTP-Referer": "https://nhaa.local",
            "X-Title": "NHAA Counsellor"
          },
          body: JSON.stringify({
            model: process.env.OPENROUTER_MODEL || "openai/gpt-4o-mini",
            messages: [
              {
                role: "system",
                content: `You are Counsellor C-104, a certified trauma-informed psychological counselor for India's National Helpline Against Atrocities (NHAA).
Speak empathetically in the citizen's language (English, Hindi, or Hinglish).
Always keep in mind what they answered during their assessment:${assessmentContextStr}
Keep response concise (2-3 sentences), warm, non-judgmental, and validating. If they are in immediate danger, remind them of toll-free 14566.`
              },
              ...history,
              { role: "user", content: userText }
            ],
            max_tokens: 220,
            temperature: 0.6
          })
        });
        if (res.ok) {
          const data = await res.json();
          const reply = data?.choices?.[0]?.message?.content?.trim();
          if (reply) return reply;
        } else {
          console.warn("OpenRouter chat HTTP", res.status, await res.text().catch(() => ""));
        }
      } catch (err) {
        console.warn("OpenRouter chat failed, using local counsellor response:", err);
      }
    }
    const lower = userText.toLowerCase();
    if (lower.includes("college") || lower.includes("hostel") || lower.includes("ragging") || lower.includes("ignore")) {
      return "I hear you. Facing discrimination or isolation in college is deeply distressing and unfair. You have the right to study in an environment free of fear and harassment. Would you like to discuss what happened with a student grievance nodal officer, or focus on how you're feeling right now?";
    }
    if (lower.includes("dhamki") || lower.includes("threat") || lower.includes("darr") || lower.includes("scared")) {
      return "It is completely understandable that you feel worried after facing threats. Please remember you are not alone\u2014under the PoA Act, your safety is protected by law. Are you in a physically secure place right now?";
    }
    if (lower.includes("neend") || lower.includes("sleep") || lower.includes("tension") || lower.includes("stress")) {
      return "Sleep disturbances and tension are natural reactions to heavy emotional strain. Take a slow, deep breath. We are here to support you at your own pace. What is on your mind right now?";
    }
    if (lower.includes("police") || lower.includes("fir") || lower.includes("nodal")) {
      return "Under NHAA 14566, we can connect you directly to an SC/ST Nodal Officer who can facilitate a Zero-FIR and protective measures without revealing your identity prematurely.";
    }
    return "Thank you for sharing that with me. I am listening attentively. Please take all the time you need\u2014what would you like to bring you the most peace of mind today?";
  }
  // Generate Tailored Counsellor Suggestions based on Citizen's Assessment Answers
  async generateCounsellorSuggestions(answers, language = "en", distressLevel = "MEDIUM") {
    const counsellorId = distressLevel === "HIGH" ? "C-108 (Priority Specialist)" : "C-104 (Trauma Counselor)";
    const allAnswersText = Object.values(answers).join(" ");
    const lowerAll = allAnswersText.toLowerCase();
    const isHindi = language.toLowerCase().includes("hi") && !language.toLowerCase().includes("hinglish");
    const isHinglish = language.toLowerCase().includes("hinglish") || this.detectLanguage(allAnswersText).language === "HINGLISH";
    const apiKey = getOpenRouterApiKey();
    const isDemoMode = process.env.DEMO_MODE === "true" || !apiKey;
    if (!isDemoMode && apiKey) {
      try {
        const prompt = `
You are Counsellor ${counsellorId} at India's National Helpline Against Atrocities (NHAA - 14566).
A citizen just finished an assessment with distress level "${distressLevel}".
Their assessment answers are:
${JSON.stringify(answers, null, 2)}

Target Language: ${isHindi ? "Formal Hindi (Devanagari)" : isHinglish ? "Conversational Roman Hinglish" : "Empathetic English"}

Generate a JSON response tailored strictly to what the citizen answered:
{
  "greeting": "Empathetic 2-sentence greeting directly acknowledging their specific answers (e.g. mentioning the threats, sleep problems, or fear they described).",
  "identified_issues": ["Specific Issue 1 derived from answers", "Specific Issue 2", "Specific Issue 3"],
  "suggestions": [
    {
      "id": "sug-1",
      "category": "legal",
      "title": "Short title",
      "badge": "Legal & Protection",
      "description": "Specific action they can take under PoA Act / NHAA protection based on the threats/slurs they mentioned.",
      "action_prompt": "Prompt user can click to ask more about this"
    },
    {
      "id": "sug-2",
      "category": "coping",
      "title": "Short title",
      "badge": "Trauma & Sleep Regulation",
      "description": "Specific somatic grounding or psychological coping advice addressing their sleep or anxiety.",
      "action_prompt": "Prompt user can click to ask about coping"
    },
    {
      "id": "sug-3",
      "category": "counselling",
      "title": "Short title",
      "badge": "Confidential Counseling",
      "description": "How 1-on-1 confidential tele-counseling can help them safely recover.",
      "action_prompt": "Prompt user can click to ask about counseling"
    }
  ],
  "recommended_prompts": [
    "Quick question 1 user might want to ask next",
    "Quick question 2",
    "Quick question 3"
  ]
}
Return only valid JSON.
`;
        const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
            "HTTP-Referer": "https://nhaa.local",
            "X-Title": "NHAA Counsellor Suggestions"
          },
          body: JSON.stringify({
            model: process.env.OPENROUTER_MODEL || "openai/gpt-4o-mini",
            messages: [{ role: "user", content: prompt }],
            response_format: { type: "json_object" },
            temperature: 0.3
          })
        });
        if (res.ok) {
          const data = await res.json();
          const parsed = JSON.parse(data?.choices?.[0]?.message?.content || "{}");
          if (parsed.greeting && parsed.suggestions && parsed.suggestions.length > 0) {
            return {
              greeting: parsed.greeting,
              identified_issues: parsed.identified_issues || ["Threats & Pressure", "Sleep Disruption"],
              counsellor_id: counsellorId,
              distress_level: distressLevel,
              suggestions: parsed.suggestions,
              recommended_prompts: parsed.recommended_prompts || [
                "How can NHAA protect my family?",
                "What should I do when panic hits at night?",
                "Can I file a confidential complaint?"
              ]
            };
          }
        }
      } catch (err) {
        console.warn("OpenRouter suggestions failed, using local rules:", err);
      }
    }
    const hasThreat = lowerAll.includes("threat") || lowerAll.includes("dhamki") || lowerAll.includes("darr") || lowerAll.includes("attack") || lowerAll.includes("marne");
    const hasSleep = lowerAll.includes("neend") || lowerAll.includes("sleep") || lowerAll.includes("insomnia") || lowerAll.includes("nightmare") || lowerAll.includes("flashback");
    const hasDiscrimination = lowerAll.includes("caste") || lowerAll.includes("slur") || lowerAll.includes("boycott") || lowerAll.includes("jaati") || lowerAll.includes("apmaan");
    const hasIsolation = lowerAll.includes("alone") || lowerAll.includes("akela") || lowerAll.includes("isolated") || lowerAll.includes("helpless");
    const identified_issues = [];
    if (hasThreat) identified_issues.push(isHindi ? "\u0927\u092E\u0915\u093F\u092F\u093E\u0902 \u0914\u0930 \u0938\u0941\u0930\u0915\u094D\u0937\u093E \u0915\u0940 \u091A\u093F\u0902\u0924\u093E" : isHinglish ? "Threats & Safety Concerns" : "Threats & Safety Concerns");
    if (hasSleep) identified_issues.push(isHindi ? "\u0928\u0940\u0902\u0926 \u0915\u0940 \u0915\u092E\u0940 \u0914\u0930 \u092E\u093E\u0928\u0938\u093F\u0915 \u0924\u0928\u093E\u0935" : isHinglish ? "Sleep Deprivation & Night Panics" : "Sleep Deprivation & Hyperarousal");
    if (hasDiscrimination) identified_issues.push(isHindi ? "\u091C\u093E\u0924\u093F\u0917\u0924 \u092D\u0947\u0926\u092D\u093E\u0935 \u0935 \u0909\u0924\u094D\u092A\u0940\u0921\u093C\u0928" : isHinglish ? "Caste Discrimination & Pressure" : "Caste-Based Harassment");
    if (hasIsolation || identified_issues.length === 0) identified_issues.push(isHindi ? "\u0905\u0915\u0947\u0932\u093E\u092A\u0928 \u0914\u0930 \u0938\u0939\u093E\u092F\u0924\u093E \u0915\u0940 \u0906\u0935\u0936\u094D\u092F\u0915\u0924\u093E" : isHinglish ? "Social Isolation & Need for Support" : "Social Isolation");
    let greeting = "";
    if (isHindi) {
      greeting = `\u0928\u092E\u0938\u094D\u0924\u0947\u0964 \u092E\u0948\u0902 \u0915\u093E\u0909\u0902\u0938\u0932\u0930 ${counsellorId} \u0939\u0942\u0901\u0964 \u092E\u0948\u0902\u0928\u0947 \u0906\u092A\u0915\u0947 \u092E\u0942\u0932\u094D\u092F\u093E\u0902\u0915\u0928 \u0909\u0924\u094D\u0924\u0930\u094B\u0902 \u0915\u094B \u0927\u094D\u092F\u093E\u0928\u092A\u0942\u0930\u094D\u0935\u0915 \u092A\u0922\u093C\u093E \u0939\u0948\u0964 ${hasThreat ? "\u0906\u092A\u0928\u0947 \u091C\u094B \u0927\u092E\u0915\u093F\u092F\u094B\u0902 \u0914\u0930 \u0905\u0938\u0941\u0930\u0915\u094D\u0937\u093E \u0915\u0947 \u092C\u093E\u0930\u0947 \u092E\u0947\u0902 \u092C\u0924\u093E\u092F\u093E \u0939\u0948, \u0935\u0939 \u0905\u0924\u094D\u092F\u0902\u0924 \u0917\u0902\u092D\u0940\u0930 \u0939\u0948\u0964" : "\u0906\u092A \u091C\u093F\u0938 \u0915\u0920\u093F\u0928 \u0938\u092E\u092F \u0914\u0930 \u0924\u0928\u093E\u0935 \u0938\u0947 \u0917\u0941\u091C\u0930 \u0930\u0939\u0947 \u0939\u0948\u0902, \u0939\u092E \u0909\u0938\u0947 \u0917\u0939\u0930\u093E\u0908 \u0938\u0947 \u0938\u092E\u091D\u0924\u0947 \u0939\u0948\u0902\u0964"} \u0906\u092A\u0915\u0947 \u0909\u0924\u094D\u0924\u0930\u094B\u0902 \u0915\u0947 \u0906\u0927\u093E\u0930 \u092A\u0930 \u092E\u0948\u0902\u0928\u0947 \u0915\u0941\u091B \u0935\u093F\u0936\u0947\u0937 \u0938\u0941\u091D\u093E\u0935 \u0924\u0948\u092F\u093E\u0930 \u0915\u093F\u090F \u0939\u0948\u0902:`;
    } else if (isHinglish) {
      greeting = `Namaste. Main Counsellor ${counsellorId} hoon. Maine aapke assessment ke answers dhyan se review kiye hain. ${hasThreat ? "Aapne jo threats aur security ke baare mein share kiya hai, wo bohot sensitive aur serious hai." : "Aap jo mental stress aur anxiety face kar rahe hain, we understand how hard it is."} Aapke answers ke basis par maine specific suggestions prepare kiye hain:`;
    } else {
      greeting = `Hello. I am Counsellor ${counsellorId}. I have reviewed your assessment answers in detail. ${hasThreat ? "The threats and fear you described are very serious, and your safety is our utmost priority." : "We recognize the deep distress and burden you are carrying."} Based specifically on what you shared, here are targeted recommendations for you:`;
    }
    const suggestions = [
      {
        id: "sug-1",
        category: "legal",
        title: isHindi ? "\u090F\u0938\u0938\u0940/\u090F\u0938\u091F\u0940 \u0905\u0924\u094D\u092F\u093E\u091A\u093E\u0930 \u0928\u093F\u0935\u093E\u0930\u0923 \u0905\u0927\u093F\u0928\u093F\u092F\u092E \u0915\u0947 \u0924\u0939\u0924 \u0938\u0941\u0930\u0915\u094D\u0937\u093E" : isHinglish ? "SC/ST PoA Act ke tahat Legal Protection" : "Protection under SC/ST PoA Act",
        badge: isHindi ? "\u0915\u093E\u0928\u0942\u0928\u0940 \u0938\u0941\u0930\u0915\u094D\u0937\u093E" : isHinglish ? "Legal Safety" : "Legal Safety",
        description: isHindi ? "\u0906\u092A\u0915\u0947 \u0926\u094D\u0935\u093E\u0930\u093E \u092C\u0924\u093E\u0908 \u0917\u0908 \u0927\u092E\u0915\u093F\u092F\u094B\u0902 \u0915\u0947 \u0932\u093F\u090F NHAA 14566 \u0915\u0947 \u0928\u094B\u0921\u0932 \u0905\u0927\u093F\u0915\u093E\u0930\u0940 \u0938\u0947 \u0938\u0902\u092A\u0930\u094D\u0915 \u0915\u0930 \u0917\u094B\u092A\u0928\u0940\u092F \u091C\u0940\u0930\u094B-\u090F\u092B\u0906\u0908\u0906\u0930 \u0914\u0930 \u092A\u0941\u0932\u093F\u0938 \u0938\u0941\u0930\u0915\u094D\u0937\u093E \u0915\u093E \u0905\u0928\u0941\u0930\u094B\u0927 \u0915\u093F\u092F\u093E \u091C\u093E \u0938\u0915\u0924\u093E \u0939\u0948\u0964" : isHinglish ? "Aapne jo threats batayi hain, uske liye NHAA 14566 nodal officer ke through confidential Zero-FIR aur security escort arrange ki ja sakti hai." : "Based on the threats and intimidation reported, you are eligible for immediate Zero-FIR registration and police protection overseen by the District Nodal Officer.",
        action_prompt: isHindi ? "\u0928\u094B\u0921\u0932 \u0905\u0927\u093F\u0915\u093E\u0930\u0940 \u0914\u0930 \u0915\u093E\u0928\u0942\u0928\u0940 \u0938\u0941\u0930\u0915\u094D\u0937\u093E \u0915\u0940 \u092A\u094D\u0930\u0915\u094D\u0930\u093F\u092F\u093E \u0915\u094D\u092F\u093E \u0939\u0948?" : isHinglish ? "Nodal officer aur legal protection ka process kya hai?" : "How can NHAA nodal officer protect my family?"
      },
      {
        id: "sug-2",
        category: "coping",
        title: isHindi ? "\u0928\u0940\u0902\u0926 \u0914\u0930 \u092A\u0948\u0928\u093F\u0915 \u0905\u091F\u0948\u0915 \u0915\u0947 \u0932\u093F\u090F 5-4-3-2-1 \u0917\u094D\u0930\u093E\u0909\u0902\u0921\u093F\u0902\u0917" : isHinglish ? "Sleep & Panic Attack Grounding Protocol" : "Somatic Grounding & Sleep Protocol",
        badge: isHindi ? "\u092E\u093E\u0928\u0938\u093F\u0915 \u0930\u093E\u0939\u0924" : isHinglish ? "Trauma Coping" : "Trauma Coping",
        description: isHindi ? "\u0930\u093E\u0924 \u092E\u0947\u0902 \u0906\u0928\u0947 \u0935\u093E\u0932\u0947 \u0921\u0930\u093E\u0935\u0928\u0947 \u0935\u093F\u091A\u093E\u0930\u094B\u0902 \u0914\u0930 \u0928\u0940\u0902\u0926 \u0915\u0940 \u0938\u092E\u0938\u094D\u092F\u093E \u0915\u0947 \u0932\u093F\u090F 4-7-8 \u0936\u094D\u0935\u093E\u0938 \u0924\u0915\u0928\u0940\u0915 \u0914\u0930 \u0938\u0902\u0935\u0947\u0926\u0940 \u0917\u094D\u0930\u093E\u0909\u0902\u0921\u093F\u0902\u0917 \u0915\u093E \u0905\u092D\u094D\u092F\u093E\u0938 \u0915\u0930\u0947\u0902 \u0924\u093E\u0915\u093F \u0936\u0930\u0940\u0930 \u0915\u093E \u0928\u0930\u094D\u0935\u0938 \u0938\u093F\u0938\u094D\u091F\u092E \u0936\u093E\u0902\u0924 \u0939\u094B \u0938\u0915\u0947\u0964" : isHinglish ? "Raat ko darr aur neend na aane par 4-7-8 breathing aur grounding practice karein jisse mind and nervous system calm ho sake." : "To manage hyperarousal, night panic, and flashbacks, practice 5-4-3-2-1 sensory grounding and rhythmic diaphragmatic breathing before sleep.",
        action_prompt: isHindi ? "\u0930\u093E\u0924 \u092E\u0947\u0902 \u0918\u092C\u0930\u093E\u0939\u091F \u0930\u094B\u0915\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u0924\u0941\u0930\u0902\u0924 \u0915\u094D\u092F\u093E \u0915\u0930\u0947\u0902?" : isHinglish ? "Raat ko panic rokne ke liye quick exercise batayein" : "Guide me through a grounding exercise for sleep anxiety"
      },
      {
        id: "sug-3",
        category: "counselling",
        title: isHindi ? "\u0917\u094B\u092A\u0928\u0940\u092F 1-\u0911\u0928-1 \u092E\u0928\u094B\u0935\u0948\u091C\u094D\u091E\u093E\u0928\u093F\u0915 \u091F\u0947\u0932\u0940-\u0915\u093E\u0909\u0902\u0938\u0932\u093F\u0902\u0917" : isHinglish ? "1-on-1 Confidential Tele-Counseling" : "Confidential 1-on-1 Counseling",
        badge: isHindi ? "\u0915\u093E\u0909\u0902\u0938\u0932\u093F\u0902\u0917 \u0938\u092A\u094B\u0930\u094D\u091F" : isHinglish ? "Support Chat" : "Support Chat",
        description: isHindi ? "NHAA \u0915\u0947 \u092A\u094D\u0930\u092E\u093E\u0923\u093F\u0924 \u092E\u0928\u094B\u0935\u0948\u091C\u094D\u091E\u093E\u0928\u093F\u0915\u094B\u0902 \u0915\u0947 \u0938\u093E\u0925 \u092C\u093F\u0928\u093E \u092A\u0939\u091A\u093E\u0928 \u0909\u091C\u093E\u0917\u0930 \u0915\u093F\u090F \u0932\u0917\u093E\u0924\u093E\u0930 \u092E\u093E\u0930\u094D\u0917\u0926\u0930\u094D\u0936\u0928 \u092A\u094D\u0930\u093E\u092A\u094D\u0924 \u0915\u0930\u0947\u0902 \u0924\u093E\u0915\u093F \u0906\u092A \u0907\u0938 \u0906\u0918\u093E\u0924 \u0938\u0947 \u0909\u092C\u0930 \u0938\u0915\u0947\u0902\u0964" : isHinglish ? "NHAA ke verified psychologists ke sath 100% anonymous private sessions continue karein to process this trauma safely." : "Continue continuous private sessions with our certified trauma psychologists to work through fear, isolation, and emotional distress.",
        action_prompt: isHindi ? "\u0915\u094D\u092F\u093E \u092E\u0947\u0930\u0940 \u092A\u0939\u091A\u093E\u0928 \u092A\u0942\u0930\u0940 \u0924\u0930\u0939 \u0917\u094B\u092A\u0928\u0940\u092F \u0930\u0939\u0947\u0917\u0940?" : isHinglish ? "Kya meri identity completely safe rahegi?" : "How does NHAA ensure my identity stays anonymous?"
      }
    ];
    const recommended_prompts = isHindi ? [
      "\u0928\u094B\u0921\u0932 \u0905\u0927\u093F\u0915\u093E\u0930\u0940 \u0938\u0947 \u0938\u0941\u0930\u0915\u094D\u0937\u093E \u0915\u0948\u0938\u0947 \u092E\u093F\u0932\u0947\u0917\u0940?",
      "\u0930\u093E\u0924 \u0915\u094B \u0918\u092C\u0930\u093E\u0939\u091F \u0914\u0930 \u0928\u0940\u0902\u0926 \u0928 \u0906\u0928\u0947 \u092A\u0930 \u0915\u094D\u092F\u093E \u0915\u0930\u0942\u0901?",
      "\u0915\u094D\u092F\u093E \u092E\u0948\u0902 \u092A\u0942\u0930\u0940 \u0924\u0930\u0939 \u0917\u094B\u092A\u0928\u0940\u092F \u0936\u093F\u0915\u093E\u092F\u0924 \u0926\u0930\u094D\u091C \u0915\u0930\u093E \u0938\u0915\u0924\u093E \u0939\u0942\u0901?"
    ] : isHinglish ? [
      "Nodal officer se security kaise milegi?",
      "Raat ko neend aur tension ke liye kya karun?",
      "Kya main anonymous complaint file kar sakta hoon?"
    ] : [
      "How can NHAA protect my family without disclosing identity?",
      "What immediate exercises can calm night panics and flashbacks?",
      "Can I file a confidential grievance through NHAA?"
    ];
    return {
      greeting,
      identified_issues,
      counsellor_id: counsellorId,
      distress_level: distressLevel,
      suggestions,
      recommended_prompts
    };
  }
  // ===== AI-Driven Conversational Assessment =====
  async conversationalReply(history, userMessage, acoustics, turnCount = 0) {
    const apiKey = getOpenRouterApiKey();
    const isDemoMode = process.env.DEMO_MODE === "true" || !apiKey;
    const textForLang = userMessage === "[SILENCE]" ? history.filter((h) => h.role === "user").map((h) => h.content).join(" ") : userMessage;
    const langDetect = this.detectLanguage(textForLang);
    if (!isDemoMode && apiKey) {
      try {
        const result = await this.callOpenRouterConversational(history, userMessage, acoustics, apiKey, turnCount);
        if (result) {
          result.detected_language = langDetect.language;
          return result;
        }
      } catch (err) {
        console.warn("OpenRouter conversational failed, falling back to local:", err);
      }
    }
    return this.localConversationalReply(history, userMessage, acoustics, turnCount, langDetect.language);
  }
  async callOpenRouterConversational(history, userMessage, acoustics, apiKey, turnCount) {
    const canComplete = turnCount >= 5;
    const systemPrompt = `You are NHAA-AI, a compassionate trauma-informed AI counselor for India's National Helpline Against Atrocities (NHAA), operating under the SC/ST Prevention of Atrocities Act.

ROLE: Conduct a NATURAL CONVERSATIONAL assessment. Do NOT list numbered questions. Ask ONE follow-up at a time.

APPROACH:
- Acknowledge and validate what the user shares FIRST, then ask ONE focused question
- Explore organically over 6-8 turns: recent troubles \u2192 daily life impact \u2192 threats/discrimination \u2192 emotional state \u2192 support system \u2192 physical safety \u2192 what would help
- Keep responses brief: 2-3 sentences + one question
- LANGUAGE: Detect and respond in the user's EXACT language \u2014 English, Hindi (Devanagari), or Hinglish (Roman-script Hindi like "Mujhe bahut mushkil ho rahi hai")
- SAFETY: If user mentions violence, suicide, or immediate danger \u2192 immediately mention helpline 14566

SILENCE: If user message is exactly "[SILENCE]", respond with ONE gentle sentence in their language \u2014 no question.

COMPLETION: ${canComplete ? `You now have sufficient context. When wrapping up, write a warm closing sentence, then append on a NEW LINE:
[ASSESSMENT_COMPLETE]
{"distress_level":"HIGH"|"MEDIUM"|"LOW","urgency":"high"|"moderate"|"low","has_safety_concern":true|false,"support_recommended":true|false,"content_indicators":["harassment","fear","discrimination","violence","isolation","safety_threat"],"summary":"One sentence describing their core situation"}
[/ASSESSMENT_COMPLETE]
Only include this block once, at the end.` : "Do NOT include [ASSESSMENT_COMPLETE] yet \u2014 continue the conversation."}`;
    const messages = [
      { role: "system", content: systemPrompt },
      ...history,
      { role: "user", content: userMessage }
    ];
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        "HTTP-Referer": "https://nhaa.local",
        "X-Title": "NHAA Conversational Assessment"
      },
      body: JSON.stringify({
        model: process.env.OPENROUTER_MODEL || "openai/gpt-4o-mini",
        messages,
        max_tokens: 300,
        temperature: 0.65
      })
    });
    if (!res.ok) {
      console.warn("OpenRouter converse HTTP", res.status, await res.text().catch(() => ""));
      return null;
    }
    const data = await res.json();
    const fullReply = data?.choices?.[0]?.message?.content?.trim() || "";
    if (!fullReply) return null;
    const completeMatch = fullReply.match(/\[ASSESSMENT_COMPLETE\]([\s\S]*?)\[\/ASSESSMENT_COMPLETE\]/) || fullReply.match(/\[ASSESSMENT_COMPLETE\]([\s\S]*?)(?=\s*$)/);
    let isComplete = false;
    let assessmentResult = void 0;
    const cleanReply = fullReply.replace(/\[ASSESSMENT_COMPLETE\][\s\S]*?(\[\/ASSESSMENT_COMPLETE\]|$)/g, "").replace(/\[\/ASSESSMENT_COMPLETE\]/g, "").trim();
    if (completeMatch) {
      try {
        assessmentResult = JSON.parse(completeMatch[1].trim());
        if (acoustics) {
          assessmentResult.vocal_signals = {
            speech_rate_change: Boolean(acoustics.speakingRate && (acoustics.speakingRate < 90 || acoustics.speakingRate > 150)),
            increased_pauses: (acoustics.pauseCount || 0) >= 3,
            pitch_variation: Boolean(acoustics.pitchVariation),
            voice_tremor: acoustics.voiceIntensity === "tremor"
          };
        }
        assessmentResult.language_confidence = 0.9;
        assessmentResult.detected_language = "ENGLISH";
        isComplete = true;
      } catch {
      }
    }
    return { reply: cleanReply, is_complete: isComplete, assessment_result: assessmentResult, detected_language: "ENGLISH" };
  }
  localConversationalReply(history, userMessage, acoustics, turnCount, language) {
    const isSilence = userMessage === "[SILENCE]";
    if (isSilence) {
      const prompts = {
        HINDI: "Main yahan hoon aur sun raha hoon \u2014 koi jaldi nahi, jab taiyaar ho jayein toh batayein.",
        HINGLISH: "Main yahan hoon. Jab ready feel karein, aap bol sakte hain ya type kar sakte hain.",
        MIXED: "I'm here / Main yahan hoon. Take your time / Aaram se bolein.",
        ENGLISH: "I'm here and listening. Please take your time \u2014 whenever you're ready, feel free to share."
      };
      return { reply: prompts[language] ?? prompts.ENGLISH, is_complete: false, detected_language: language };
    }
    const questions = [
      {
        ENGLISH: "Thank you for sharing that. I can hear this has been weighing heavily on you. How has this situation been affecting your daily life \u2014 your sleep, your work, or your sense of routine?",
        HINDI: "Aapki baat sunke dil dukha. Main samajh sakta hoon yeh kitna mushkil raha hoga. Kya aap bata sakte hain ki is situation ne aapki daily life \u2014 neend, kaam ya routine \u2014 ko kaise affect kiya hai?",
        HINGLISH: "Thank you for sharing that. Yeh sab bahut mushkil raha hoga. Is situation ne aapki daily life, neend ya routine ko kaise affect kiya hai?",
        MIXED: "Thank you for sharing / Share karne ke liye shukriya. Yeh situation ne aapki daily life ko kaise affect kiya hai?"
      },
      {
        ENGLISH: "I understand how painful this must be. Have you experienced any threats, discrimination, or intimidation from anyone because of your identity or what happened?",
        HINDI: "Aap bahut mushkil waqt se guzar rahe hain. Kya aapne kisi ke dwara dhamki, bhedbhav ya dabaav ka anubhav kiya hai?",
        HINGLISH: "Yeh sab share karna bahut brave hai. Kya aapne kisi ke dwara threats, discrimination, ya caste-based pressure experience kiya hai?",
        MIXED: "I hear you. Kya aapne kisi se threats ya discrimination experience kiya hai?"
      },
      {
        ENGLISH: "Your courage in sharing this is clear. How are you feeling emotionally right now \u2014 scared, angry, exhausted, numb, or perhaps something else?",
        HINDI: "Aap bahut brave hain ki yeh sab share kar rahe hain. Abhi is waqt, is sab ke baare mein sochte hue aap emotionally kaisa feel kar rahe hain?",
        HINGLISH: "Itna share karna himmat ka kaam hai. Is waqt aap emotionally kaisa feel kar rahe hain \u2014 gussa, darr, numb, ya kuch aur?",
        MIXED: "Is waqt emotionally kaisa feel ho raha hai \u2014 scared, angry, ya numb?"
      },
      {
        ENGLISH: "Your feelings make complete sense given what you've been through. Do you have people around you \u2014 family, friends, or community \u2014 who are supporting you, or do you feel largely alone in this?",
        HINDI: "Aapki feelings bilkul samajh mein aati hain. Kya aapke paas koi hai \u2014 parivaar, dost ya samudaay \u2014 jo aapka saath de raha hai, ya aap akela feel kar rahe hain?",
        HINGLISH: "Aapki feelings bilkul valid hain. Kya koi hai jo aapko support kar raha hai \u2014 family, friends, community \u2014 ya aap isolated feel kar rahe hain?",
        MIXED: "Kya koi support karne wala hai, ya aap akele feel kar rahe hain?"
      },
      {
        ENGLISH: "I want to ask you directly \u2014 are you or your family currently worried about immediate physical safety? Is there any active danger right now?",
        HINDI: "Main seedha poochhna chahta hoon \u2014 kya aap ya aapka parivaar abhi immediate physical safety ko lekar worried hain?",
        HINGLISH: "Ek important sawaal \u2014 kya aap ya aapki family abhi physically safe hain, ya koi immediate threat hai?",
        MIXED: "Are you / kya aap physically safe hain? Koi immediate danger hai?"
      }
    ];
    const userTurns = history.filter((m) => m.role === "user").length;
    if (userTurns >= 4 || turnCount >= 5) {
      const combinedText = history.filter((m) => m.role === "user").map((m) => m.content).join(" ") + " " + userMessage;
      const evaluation = this.evaluateLocalDualStream(combinedText, acoustics || {}, language, 0.85);
      const wrapUps = {
        HINDI: "Shukriya itni zaroori baat share karne ke liye. Maine aapki poori baat dhyan se suni hai. Ab main aapko ek dedicated support counsellor se connect kar raha hoon jo sahi guidance de sakta hai.",
        HINGLISH: "Thank you itna kuch share karne ke liye. Ab main aapko ek counsellor se connect kar raha hoon jo aapki help karega.",
        ENGLISH: "Thank you so much for trusting me with all of this. I have listened carefully to everything you've shared. I'm now connecting you with a dedicated support counsellor who can provide the right guidance for your situation.",
        MIXED: "Thank you / Shukriya for sharing everything. Ab main aapko ek counsellor se connect kar raha hoon."
      };
      return {
        reply: wrapUps[language] ?? wrapUps.ENGLISH,
        is_complete: true,
        assessment_result: {
          ...evaluation,
          summary: "Assessment based on your shared experiences during our conversation.",
          language
        },
        detected_language: language
      };
    }
    const qi = Math.min(userTurns, questions.length - 1);
    const reply = questions[qi][language] ?? questions[qi].ENGLISH;
    return { reply, is_complete: false, detected_language: language };
  }
};
var assessmentService = new AssessmentService();

// api/chat.ts
process.env.OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || Buffer.from("c2stb3ItdjEtOTlhYTg5ZDEyZDMzMTUzNzU1OWRkNjE4MGJkNmZmYWRmNWFiNWUwNDNlZTFjZmVmMzI2M2U2NDNmYzFiNjA1Mw==", "base64").toString("utf8");
var SAFETY_KEYWORDS = [
  "kill",
  "suicide",
  "die",
  "murder",
  "weapon",
  "attack",
  "bomb",
  "blood",
  "jaan",
  "khatra",
  "marne",
  "hathiyar",
  "hamla",
  "khoon",
  "maut",
  "jala",
  "kutte",
  "goli",
  "chaku",
  "kaanp",
  "jane",
  "dhamki",
  "maar",
  "peet"
];
var EMERGENCY_REPLY = "Your immediate safety is our highest priority. If you or your loved ones are facing imminent physical danger right now, please reach out to local police or our toll-free 24x7 emergency helpline at 14566 immediately. We can connect you to emergency protection and an emergency nodal officer.";
function isEmergencyInput(text) {
  const lower = text.toLowerCase();
  return SAFETY_KEYWORDS.some((k) => lower.includes(k));
}
async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  if (req.method !== "POST") {
    return res.status(405).json({ error: "METHOD_NOT_ALLOWED" });
  }
  const { user_text, history = [], assessment_answers } = req.body || {};
  if (!user_text || typeof user_text !== "string") {
    return res.status(400).json({ error: "USER_TEXT_REQUIRED" });
  }
  if (isEmergencyInput(user_text)) {
    return res.json({ reply: EMERGENCY_REPLY, counsellor_message: { text: EMERGENCY_REPLY } });
  }
  const normalisedHistory = history.filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string").map((m) => ({ role: m.role, content: m.content }));
  try {
    const reply = await assessmentService.generateCounsellorReply(normalisedHistory, user_text, assessment_answers);
    return res.json({ reply, counsellor_message: { text: reply } });
  } catch (err) {
    console.error("Chat error:", err);
    return res.json({
      reply: "Main aapki baat sun raha hoon. Kripya batayein ki main aapki kis tarah se madad kar sakta hoon?",
      counsellor_message: { text: "Main aapki baat sun raha hoon. Kripya batayein ki main aapki kis tarah se madad kar sakta hoon?" }
    });
  }
}
