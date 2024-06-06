import { generateDocumentation } from "../../../utils/saveMarkdownDocumentation";
import { scrapingGithub } from "../../../utils/github";

export async function POST(request: Request) {
  try {
    const { url } = await request.json();
    if (!url) {
      return Response.json(
        { status: "error", message: "URL is required" },
        { status: 400 }
      );
    }
    const userId = 999;
    const repo = await scrapingGithub(url);
    const data = await generateDocumentation(userId, repo);

    return Response.json({ status: "success", data: data, userId: userId });
  } catch (error) {
    console.error("Error processing the request:", error);
    return Response.json(
      { status: "error", message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
