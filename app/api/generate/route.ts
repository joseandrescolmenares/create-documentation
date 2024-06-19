import { generateDocumentation } from "../../../utils/saveMarkdownDocumentation";
import { scrapingGithub } from "../../../utils/github";

export async function POST(request: Request) {
  try {
    const { url } = await request.json();
    if (!url) {
      return new Response(
        JSON.stringify({ status: "error", message: "URL is required" }),
        { status: 400 }
      );
    }
    const userId = 999;
    const repoResult = await scrapingGithub(url);

    if (repoResult.status === 500) {
      return new Response(
        JSON.stringify({ status: "error", message: repoResult.error }),
        { status: 500 }
      );
    }

    const data = await generateDocumentation(userId, repoResult.data);

    return new Response(
      JSON.stringify({ status: "success", data: data, userId: userId }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing the request:", error);
    return new Response(
      JSON.stringify({ status: "error", message: "Internal Server Error" }),
      { status: 500 }
    );
  }
}