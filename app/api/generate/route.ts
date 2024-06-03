import { generateDocumentation } from "../../../utils/saveMarkdownDocumentation";
import { scrapingGithub } from "../../../utils/github";

export async function GET() {
    const userId = 999; 
    const repo = await scrapingGithub("https://github.com/joseandrescolmenares/Challege")
    console.log(repo),"repor"
    const data = await generateDocumentation(userId,repo)
  return Response.json({ status: data });
}
