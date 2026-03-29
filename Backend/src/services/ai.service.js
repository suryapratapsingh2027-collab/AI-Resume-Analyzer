const {GoogleGenAI} = require('@google/genai')
const {z} = require('zod')
const {zodToJsonSchema} = require('zod-to-json-schema')

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
})

const interviewReportSchema = z.object({
    matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate's profile matches the job describe"),
    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Technical questions that can be asked in the interview along with their intention and how to answer them"),
    behavioralQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Behavioral questions that can be asked in the interview along with their intention and how to answer them"),
    skillGaps: z.array(z.object({
        skill: z.string().describe("The skill which the candidate is lacking"),
        severity: z.enum([ "low", "medium", "high" ]).describe("The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances")
    })).describe("List of skill gaps in the candidate's profile along with their severity"),
    preparationPlan: z.array(z.object({
        day: z.number().describe("The day number in the preparation plan, starting from 1"),
        focus: z.string().describe("The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc."),
        tasks: z.array(z.string()).describe("List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.")
    })).describe("A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively"),
    title: z.string().describe("The title of the job for which the interview report is generated"),
})

async function generateInterviewReport({resume, jobDescription, selfDescription}){
   const prompt = `
You are an expert AI interview assistant.

Your task is to generate a COMPLETE interview report in STRICT JSON format.

⚠️ CRITICAL RULES (MUST FOLLOW):
- Return ONLY valid JSON (no explanation, no text outside JSON)
- Follow the structure EXACTLY
- DO NOT skip any field
- DO NOT return empty arrays
- DO NOT return flat arrays like ["question", "..."]
- ALL arrays MUST contain OBJECTS (not strings)
- If structure is wrong → response is INVALID

--------------------------------------

✅ REQUIRED JSON STRUCTURE:

{
  "matchScore": number,
  "technicalQuestions": [
    {
      "question": string,
      "intention": string,
      "answer": string
    }
  ],
  "behavioralQuestions": [
    {
      "question": string,
      "intention": string,
      "answer": string
    }
  ],
  "skillGaps": [
    {
      "skill": string,
      "severity": "low" | "medium" | "high"
    }
  ],
  "preprationPlan": [
    {
      "day": number,
      "focus": string,
      "tasks": string[]
    }
  ]
}

--------------------------------------

📌 DATA REQUIREMENTS:

1. matchScore:
- number between 0–100

2. technicalQuestions:
- minimum 3 items
- MUST be objects
- Each must include real MERN stack interview question

3. behavioralQuestions:
- minimum 3 items
- MUST follow real interview style
- Answer should follow STAR method

4. skillGaps:
- minimum 2 items
- severity MUST be one of: low, medium, high

5. preprationPlan:
- minimum 5 days
- tasks MUST be array of at least 2 strings

--------------------------------------

📌 VERY IMPORTANT FORMAT RULE:

❌ WRONG:
"technicalQuestions": ["question", "..."]

✅ CORRECT:
"technicalQuestions": [
  {
    "question": "...",
    "intention": "...",
    "answer": "..."
  }
]

--------------------------------------

📌 GENERATION RULE:

- If any field is empty → regenerate internally
- Ensure all arrays are properly filled
- Ensure correct object structure
- Ensure JSON is valid and parsable

--------------------------------------

📌 INPUT DATA:

Resume:
${resume}

Self Description:
${selfDescription}

Job Description:
${jobDescription}

--------------------------------------

Now generate the FINAL JSON response.`

    const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
    })
    const raw = response.text

    return JSON.parse(raw)
}

module.exports = generateInterviewReport
