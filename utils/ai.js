import OpenAI from "openai";
import { wrapOpenAI } from "langsmith/wrappers";
const { GoogleGenerativeAI } = require("@google/generative-ai");

const openai = wrapOpenAI(new OpenAI({ apiKey: process.env.OPENAI_API_KEY }));

export async function callLLM(prompt) {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: prompt,
        },
      ],
      model: "gpt-4o",
      response_format: { type: "json_object" },
    });
    console.log(completion.choices[0].message.content, "RESPONSE LLM")
    return completion.choices[0].message.content;


  } catch (error) {
    console.error("Error al llamar a la API de OpenAI:", error);
    throw error;
  }
}