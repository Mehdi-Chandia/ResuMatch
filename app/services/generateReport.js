
import {GoogleGenAI} from "@google/genai";

const ai=new GoogleGenAI({
    apiKey:process.env.GOOGLE_API_KEY,
})


export async function generateReport({resumeText,selfDescription,jobDescription}){

    console.log({ resumeTextLen: resumeText?.length, jobDescriptionLen: jobDescription?.length });

    const prompt = `
You are an expert technical recruiter and interview coach.

Analyze the candidate against the job description below and return ONLY valid JSON — no markdown fences, no commentary, no extra text before or after.

RESUME:
${resumeText}

JOB DESCRIPTION:
${jobDescription}

CANDIDATE SELF-DESCRIPTION:
${selfDescription || "Not provided"}

Return JSON in EXACTLY this shape:
{
  "title": string (a short title for this report, e.g. "Frontend Developer Fit Analysis"),
  "matchScore": number (0-100, give a number between the given range according how well the resume matches the job description),
  "technicalQuestions": [
    { "question": string, "intention": string (why this is being asked), "answer": string (a strong sample answer based on the resume) }
  ],
  "behavioralQuestions": [
    { "question": string, "intention": string, "answer": string }
  ],
  "skillGap": [
    { "skill": string, "severity": "low" | "medium" | "high" }
  ],
  "preparationalPlan": [
    { "day": number, "focus": string, "tasks": string[] }
  ]
}

Rules:
- Generate 4-6 technicalQuestions and 3-5 behavioralQuestions, tailored to gaps and the JD.
- skillGap should list only skills required by the JD that are weak or missing in the resume.
- preparationalPlan should be a realistic 5-7 day plan.
- severity must be exactly "low", "medium", or "high" — nothing else.
`;

    const response=await ai.models.generateContent({
        model:"gemini-2.5-flash",
        contents:prompt,
        config:{
            responseMimeType:'application/json'
        }
    })
    // console.log(response.text)
    const parsedResponse=JSON.parse(response.text)
    console.log("parsed response ",parsedResponse)
    return parsedResponse;
}