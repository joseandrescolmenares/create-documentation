const {
  GithubRepoLoader,
} = require("@langchain/community/document_loaders/web/github");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { scrapingGithubPrompt } = require("./promps");

export async function scrapingGithub(url) {
  try {
    // Cargar el repositorio de GitHub
    const loader = new GithubRepoLoader(url, {
      branch: "main",
      recursive: true,
      processSubmodules: true,
      unknown: "warn",
    });

    const docs = await loader.load();

    // Formatear los datos del repositorio
    const repository = docs.map((el) => ({
      route: el.metadata.source,
      content: el.pageContent,
    }));

    const repo = JSON.stringify(repository);

    // Asegurarse de que la API key esté disponible
    if (!process.env.API_KEY_GEMINIC) {
      throw new Error("API key for Google Generative AI is missing.");
    }

    // Instanciar el modelo generativo
    const genAI = new GoogleGenerativeAI(process.env.API_KEY_GEMINIC);

    // Obtener el modelo específico
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro", });



    const result = await model.generateContent(scrapingGithubPrompt(repo));
    const text = result.response.text();

    // Retornar la respuesta en formato JSON
    return text;
  } catch (error) {
    // Manejo de errores
    console.error("Error:", error);
    return (
      JSON.stringify({ error: error.message }),
      {
        status: 500,
      }
    );
  }
}
