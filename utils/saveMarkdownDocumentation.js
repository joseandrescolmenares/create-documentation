
const fs = require('fs');
const path = require('path');
const { callLLM } = require('./ai');
const { Fragment } = require('react');
const { generateDocumentationPrompt, generateMetaPrompt } = require("./promps.js")

async function generateDocumentation(userId, repo) {
  // Prompt para generar la documentación

  const documentationResponse = await callLLM(generateDocumentationPrompt(repo));
  console.log(documentationResponse,"document, reponse")
  const documentation = JSON.parse(documentationResponse);

  const metaResponse = await callLLM(generateMetaPrompt(documentation));
  const metaConfig = JSON.parse(metaResponse);

  // Directorio específico del usuario
  const userDocsDir = path.join(process.cwd(), 'pages/docs', `docs_999`);

  // Crear directorio si no existe
  if (!fs.existsSync(userDocsDir)) {
    fs.mkdirSync(userDocsDir, { recursive: true });
  }

  // Función para guardar archivos Markdown recursivamente
  function saveMarkdownFiles(baseDir, docs) {
    for (const [filename, content] of Object.entries(docs)) {
      if (typeof content === 'object') {
        const subDir = path.join(baseDir, filename);
        if (!fs.existsSync(subDir)) {
          fs.mkdirSync(subDir, { recursive: true });
        }
        if (content.index) {
          const filePath = path.join(subDir, 'index.mdx');
          fs.writeFileSync(filePath, content.index);
        }
        saveMarkdownFiles(subDir, content);
      } else if (typeof content === 'string') {
        const filePath = path.join(baseDir, `${filename}.mdx`);
        fs.writeFileSync(filePath, content);
      }
    }
  }

  // Guardar la documentación
  saveMarkdownFiles(userDocsDir, documentation);

  // Guardar archivo _meta.json
  const metaPath = path.join(userDocsDir, '_meta.json');
  fs.writeFileSync(metaPath, JSON.stringify(metaConfig, null, 2));

  return { documentation, metaConfig };
}

module.exports = { generateDocumentation };