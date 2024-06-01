import { generateDocumentation } from "../../../utils/saveMarkdownDocumentation";
import { scrapingGithub } from "../../../utils/github";

export async function GET() {
    // const data = await callLLM("ERES UN ASISTENTE QUE DA RECETAS DE COCINAS CORTAS, responda en formato json ");
    const userId = 999; // ID del usuario
    const repo = await scrapingGithub("https://github.com/joseandrescolmenares/ChallengeCux")
    const data = await generateDocumentation(userId,repo)
  return Response.json({ status: data });
}
