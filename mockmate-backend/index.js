import { GoogleGenerativeAI } from "@google/generative-ai";

const generateResponse = async (topic, difficulty) => {
  const API_KEY = "AIzaSyCrjQ0ZqLidOGccatzRPHIdxLxyHkwSH2Y";
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = `Generate exactly 20 multiple-choice questions on the topic of ${topic} at ${difficulty} level.
  Return ONLY a valid JSON array with no extra text, markdown formatting, or trailing commas.
  Each question object in the array MUST strictly follow this JSON schema:
  
  {
    "question": "1. What is...?",
    "options": [
      { "key": "a", "value": "Option A" },
      { "key": "b", "value": "Option B" },
      { "key": "c", "value": "Option C" },
      { "key": "d", "value": "Option D" }
    ],
    "answer": { "key": "a", "value": "Option A" }
  }
  
  Rules:
  - All keys and string values must be enclosed in double quotes.
  - The options array must contain exactly 4 objects with keys "a", "b", "c", and "d".
  - The answer object must exactly match one of the option objects.
  - Do not include any extra text, markdown code blocks, or invalid JSON.
  - If any generated question does not strictly adhere to this schema, do NOT include it.
  
  Output only the valid JSON array.`;

  try {
    const result = await model.generateContent(prompt);

    // Extract the response text properly
    const responseText = result.response.candidates[0].content.parts[0].text;

    // Sanitize the response: Remove ```json ... ```
    const cleanedJson = responseText.replace(/```json/g, "").replace(/```/g, "").trim();

    // Parse JSON string to object
    const jsonData = JSON.parse(cleanedJson);

    console.log(JSON.stringify(jsonData, null, 2));

  } catch (error) {
    console.error("Error generating questions:", error);
  }
};

generateResponse("Css", "Hard");
