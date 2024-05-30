const {
  GithubRepoLoader,
} = require("@langchain/community/document_loaders/web/github");
const { GoogleGenerativeAI } = require("@google/generative-ai");

export async function GET() {
  const loader = new GithubRepoLoader(
    "https://github.com/joseandrescolmenares/ChallengeCux",
    {
      branch: "main",
      recursive: true,
      processSubmodules: true,
      unknown: "warn",
    }
  );

  const docs = await loader.load();

  const repository = docs.map((el) => {
      return {route: el.metadata.source, content: el.pageContent };
    })

    const repo = JSON.stringify(repository)

    // Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY_GEMINIC);


// The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

const prompt = `su tarea es crear una documentacion detalla y completa  del siguiente repositorio ${repo}, tambien puede dar ejemplo si lo desea, recibira la ruta y el contenido de cada archivo que esta en el repositorio y debe explicar como funciona las partes mas importantes  de cada funcion o enpoint del repositorio,como por ejemplo,  que hace y para que se utiliza `

const result = await model.generateContent(prompt);
const response = await result.response;
const text = response.text();




  return Response.json({ status: text });
}


