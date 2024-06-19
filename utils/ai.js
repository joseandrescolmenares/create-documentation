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
 
    return completion.choices[0].message.content;


  } catch (error) {
    console.error("Error calling the OpenAI API:", error);
    throw error;
  }
}