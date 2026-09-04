import { assessmentService } from '../server/assessmentService'

async function main() {
  console.log('Testing generateCounsellorSuggestions...')
  try {
    const res = await assessmentService.generateCounsellorSuggestions(
      { Q1: 'Some threats and discrimination', Q2: 'Cannot sleep at night' },
      'hinglish',
      'HIGH'
    )
    console.log('Result:', JSON.stringify(res, null, 2))
  } catch (e) {
    console.error('Error:', e)
  }
}

main()
