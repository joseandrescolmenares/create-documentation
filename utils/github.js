const {
  GithubRepoLoader,
} = require("@langchain/community/document_loaders/web/github");
const { GoogleGenerativeAI } = require("@google/generative-ai");

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

    const prompt = `
    
    Lea detenidamente el repositorio y resuma cada parte del mismo, identificando los endpoints implicados y todas las partes del repositorio. y expliqeu cada parte del repositorio, detlladamente tenga en cuenta que esta creando una documentacion del repositorio y debe ser detallado y debe explicar muy bien todas las partes del repositorio para tener una documentacion clara

  En primer lugar, describe de qué trata el proyecto y describe todos los puntos finales del repositorio. Desglosa los puntos clave, identifica los aspectos más importantes del proyecto e intenta explicarlos de la mejor manera posible.


### Repositorio:  
    ${repo}


    `;

    const result = await model.generateContent(prompt);
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
