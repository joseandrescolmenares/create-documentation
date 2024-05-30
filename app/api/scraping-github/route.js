const {
  GithubRepoLoader,
} = require("@langchain/community/document_loaders/web/github");

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
  console.log(
    docs.map((el) => {
      return { route: el.metadata.source, content: el.pageContent};
    })
  );

  return Response.json({ status: 200 });
}
