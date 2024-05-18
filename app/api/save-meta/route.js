import { generateDocumentation } from "../../../utils/saveMarkdownDocumentation";

export async function GET() {
    // const data = await callLLM("ERES UN ASISTENTE QUE DA RECETAS DE COCINAS CORTAS, responda en formato json ");
    const data = await generateDocumentation();
    console.log(data);
  return Response.json({ status: 200 });
}
