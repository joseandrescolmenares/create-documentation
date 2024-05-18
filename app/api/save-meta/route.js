import { generateDocumentation } from "../../../utils/saveMarkdownDocumentation";
import {callLLM} from "../../../utils/generateDocumentation"

export async function GET() {
    // const data = await callLLM("ERES UN ASISTENTE QUE DA RECETAS DE COCINAS CORTAS, responda en formato json ");
    const data = await generateDocumentation();
    console.log(data);
  return Response.json({ status: 200 });
}
