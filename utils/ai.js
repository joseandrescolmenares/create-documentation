import OpenAI from "openai";
import { wrapOpenAI } from "langsmith/wrappers";
const { GoogleGenerativeAI } = require("@google/generative-ai");

// const openai = wrapOpenAI(new OpenAI({ apiKey: process.env.OPENAI_API_KEY }));

export async function callLLM(prompt) {
  try {
    const genAI = new GoogleGenerativeAI(process.env.API_KEY_GEMINIC);

    const generationConfig = {
      temperature: 0.9,
      topP: 0.1,
      topK: 16,
      response_mime_type: "application/json", 
    };
    

    // Obtener el modelo específico
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro",generationConfig});
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return text;
  } catch (error) {
    console.error("Error al llamar a la API de OpenAI:", error);
    throw error;
  }
}
