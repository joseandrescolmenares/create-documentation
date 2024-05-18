const fs = require("fs");
const path = require("path");
import OpenAI from "openai";

const openai = new OpenAI({apiKey:"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"});

async function callLLM(prompt) {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: prompt,
        },
      ],
      model: "gpt-4o-2024-05-13",
      response_format: { type: "json_object" },
    });
    console.log(completion.choices[0].message.content, "RESPONSE LLM")
    return completion.choices[0].message.content;
  } catch (error) {
    console.error("Error al llamar a la API de OpenAI:", error);
    throw error;
  }
}

async function generateDocumentation(userId,) {

    const documentationPrompt =
      `Genera la documentación para un proyecto incluyendo un index como  introducción y varias secciones con temas. Proporciona el contenido en formato json donde cada clave es el nombre de una sección o tema, y el valor es el contenido en formato Markdown.
      
      ejemplo de respuesta:

      {
        "index": "# Introducción\nEsta es la página de introducción.",
        "advanced": {
            "index": "# Sección Avanzada\nEsta es la sección avanzada.",
            "topic1": "# Tema 1\nDetalles sobre el tema 1.",
            "topic2": "# Tema 2\nDetalles sobre el tema 2."
        },
        "customSection": {
            "index": "# Sección Personalizada\nDetalles de la sección personalizada.",
            "subtopic1": "# Subtema 1\nDetalles del subtema 1."
        }
    }
       `;
  
    const metaPrompt =
      `Genera una configuración de meta en formato json para la documentación proporcionada. Incluye títulos para cada sección y tema, y cualquier configuración adicional necesaria para Nextra.
      
      ejemplo de respuesta:
      
      {
        "index": "Introducción",
        "advanced": {
            "title": "Sección Avanzada",
            "type": "folder"
        },
        "customSection": {
            "title": "Sección Personalizada",
            "type": "folder"
        }
    }
       `;
  

  // Llama al LLM para obtener la documentación y la configuración meta
  const llmResponse = await callLLM(documentationPrompt);
  const llmMetaResponse = await callLLM(metaPrompt);

  // Valida y procesa la respuesta
  const documentation = JSON.parse(llmResponse);
  const metaConfig = JSON.parse(llmMetaResponse);

  // Directorio específico del usuario
  const userDocsDir = path.join(process.cwd(), "pages/docs", `docs_999`);

  // Crear directorio si no existe
  if (!fs.existsSync(userDocsDir)) {
    fs.mkdirSync(userDocsDir, { recursive: true });
  }

  // Función para guardar archivos Markdown recursivamente
  function saveMarkdownFiles(baseDir, docs) {
    for (const [filename, content] of Object.entries(docs)) {
      if (typeof content === "object" && content.index !== undefined) {
        // Si el contenido es un objeto con un índice, crear una carpeta y guardar los archivos dentro de ella
        const subDir = path.join(baseDir, filename);
        if (!fs.existsSync(subDir)) {
          fs.mkdirSync(subDir, { recursive: true });
        }
        saveMarkdownFiles(subDir, content);
      } else if (typeof content === "string") {
        // Si el contenido es una cadena, guardar el archivo Markdown
        const filePath = path.join(baseDir, `${filename}.mdx`);
        fs.writeFileSync(filePath, content);
      }
    }
  }

  // Guardar la documentación
  saveMarkdownFiles(userDocsDir, documentation);

  // Guardar archivo _meta.json
  const metaPath = path.join(userDocsDir, "_meta.json");
  fs.writeFileSync(metaPath, JSON.stringify(metaConfig, null, 2));

  return { documentation, metaConfig };
}

module.exports = { generateDocumentation };

