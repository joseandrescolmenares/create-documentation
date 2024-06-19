const {
  GithubRepoLoader,
} = require("@langchain/community/document_loaders/web/github");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { scrapingGithubPrompt } = require("./promps");

export async function scrapingGithub(url) {
  try {
    const loader = new GithubRepoLoader(url, {
      branch: "main",
      recursive: true,
      processSubmodules: true,
      unknown: "warn",
      ignorePaths: [
        "package-lock.json",
        ".gitignore",
        "tailwind.config.js",
        "postcss.config.js",
        "vite.config.js",
        "yarn.lock",
        "node_modules",
        "package.json",
        "*.svg",
        "*.jpg",
        "next/core-web-vitals",
        ".eslintrc.json",
        "components.json",
        "database.types.ts",
        "next.config.js",
        "tsconfig.json",
        "postcss.config.ts",
        "tailwind.config.ts",
        "vite.config.ts",
        "next.config.ts",
        "globals.css"
      ],
    });

    const docs = await loader.load();

    const repository = docs.map((el) => ({
      route: el.metadata.source,
      content: el.pageContent,
    }));

    const repo = JSON.stringify(repository);

    if (!process.env.API_KEY_GEMINIC) {
      throw new Error("API key for Google Generative AI is missing.");
    }

    const genAI = new GoogleGenerativeAI(process.env.API_KEY_GEMINIC);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(scrapingGithubPrompt(repo));
    const text = result.response.text();

    return { status: 200, data: text };
  } catch (error) {
    console.error("Error:", error);
    return {
      status: 500,
      error: error.message,
    };
  }
}
