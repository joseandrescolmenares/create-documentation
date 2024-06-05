import OpenAI from "openai";
import { wrapOpenAI } from "langsmith/wrappers";
const { GoogleGenerativeAI } = require("@google/generative-ai");

// const openai = wrapOpenAI(new OpenAI({ apiKey: process.env.OPENAI_API_KEY }));

export async function callLLM(prompt) {
  try {
    // const completion = await openai.chat.completions.create({
    //   messages: [
    //     {
    //       role: "system",
    //       content: prompt,
    //     },
    //   ],
    //   model: "gpt-4o-2024-05-13",
    //   response_format: { type: "json_object" },
    // });
    // console.log(completion.choices[0].message.content, "RESPONSE LLM")
    // return completion.choices[0].message.content;

    if (!process.env.API_KEY_GEMINIC) {
      throw new Error("API key for Google Generative AI is missing.");
    }

    const generationConfig = {
      response_mime_type: "application/json",
      temperature: 0.1,
    
    };


    const genAI = new GoogleGenerativeAI(process.env.API_KEY_GEMINIC,);

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro",  generationConfig })


    const result = await model.generateContent(prompt);
    const text = result.response.text();
    return text
  } catch (error) {
    console.error("Error al llamar a la API de OpenAI:", error);
    throw error;
  }
}