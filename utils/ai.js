import OpenAI from "openai";

const openai = new OpenAI({apiKey: "sk-proj-DxHqck0xWlO3tXEC6UZsT3BlbkFJaekU2JxrEtnizBsrWhjz"});

export async function callLLM(prompt) {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: prompt,
        },
      ],
      model: "gpt-4o-2024-05-13",
      response_format: { type: "json_object" },
    });
    console.log(completion.choices[0].message.content, "RESPONSE LLM");
    return completion.choices[0].message.content;
  } catch (error) {
    console.error("Error al llamar a la API de OpenAI:", error);
    throw error;
  }
}


