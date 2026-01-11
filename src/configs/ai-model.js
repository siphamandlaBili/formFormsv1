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
      "fieldName": string,
      "label": string,
      "fieldType": string,
      "placeholder": string,
      "required": boolean,
      "options": array (for select, radio, checkbox fields),
      "rows": number (for textarea fields),
      "description": string (optional field help text)
    }
  ]
}

Field Types Available:
- "text": Regular text input
- "email": Email input with validation
- "password": Password input
- "number": Numeric input
- "tel": Phone number input
- "url": URL input
- "date": Date picker
- "textarea": Multi-line text area
- "select": Dropdown with options array
- "radio": Radio buttons with options array
- "checkbox": Checkboxes with options array (or single checkbox without options)

Rules:
- Use "fieldName" for the field identifier (snake_case preferred)
- Use "fieldType" for the input type
- Infer the form purpose from the user description
- The title should be short and clear
- The subheading should briefly explain who the form is for or what it collects
- The description should provide additional context or instructions
- Choose appropriate field types based on the data being collected
- For select, radio, and checkbox fields, include an "options" array with string values
- For textarea fields, optionally include "rows" property (default 4)
- Include "description" property for fields that need help text
- Include all necessary fields to reasonably complete the form
- Mark appropriate fields as required: true/false
- Do not include explanations, comments, or markdown
- Output JSON only

Examples of proper field structures:
- Text: {"fieldName": "full_name", "label": "Full Name", "fieldType": "text", "required": true}
- Email: {"fieldName": "email", "label": "Email Address", "fieldType": "email", "required": true}
- Select: {"fieldName": "country", "label": "Country", "fieldType": "select", "options": ["Canada", "USA", "UK"], "required": true}
- Textarea: {"fieldName": "comments", "label": "Comments", "fieldType": "textarea", "rows": 6, "required": false}
- Checkbox: {"fieldName": "skills", "label": "Skills", "fieldType": "checkbox", "options": ["JavaScript", "Python", "Java"], "required": false}

User description:
<<USER_PROMPT>>`;

export async function generateFormWithAI(userPrompt) {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = AI_PROMPT.replace('<<USER_PROMPT>>', userPrompt);

    const result = await model.generateContent(prompt);
    const response = result.response;
    let text = response.text();

    text = text
      .replaceAll('```json', '')
      .replaceAll('```', '')
      .trim();


    const formData = JSON.parse(text);

    return formData;
  } catch (error) {
    throw new Error(error?.message || 'Failed to generate form. Please try again.');
  }
}
