import { GoogleGenerativeAI } from '@google/generative-ai';

const AI_PROMPT = `You are an AI form generator.

Given a user description, generate a complete form definition.

Always return the result in valid JSON using the following structure:

{
  "title": string,
  "subheading": string,
  "description": string,
  "fields": [
    {
      "name": string,
      "label": string,
      "type": string,
      "placeholder": string,
      "required": boolean
    }
  ]
}

Rules:
- Infer the form purpose from the user description.
- The title should be short and clear.
- The subheading should briefly explain who the form is for or what it collects.
- The description should provide additional context or instructions.
- Choose appropriate field types (text, email, number, select, checkbox, textarea, date).
- Include all necessary fields to reasonably complete the form.
- Do not include explanations, comments, or markdown.
- Output JSON only.

User description:
<<USER_PROMPT>>`;

export async function generateFormWithAI(userPrompt) {
  try {
    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    
    const prompt = AI_PROMPT.replace('<<USER_PROMPT>>', userPrompt);
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();
    
    text = text.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
    
    const formData = JSON.parse(text);
    
    return formData;
  } catch (error) {
    throw new Error('Failed to generate form. Please try again.');
  }
}
