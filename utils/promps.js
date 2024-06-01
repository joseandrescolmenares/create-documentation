export const generateDocumentationPrompt = (repo) => `
Lea detenidamente el repositorio y resuma cada parte del mismo, identificando los endpoints implicados y todas las partes del repositorio.

En primer lugar, describe de qué trata el proyecto y describe todos los puntos finales del repositorio. Desglosa los puntos clave, identifica los aspectos más importantes del proyecto e intenta explicarlos de la mejor manera posible.

Cuando hayas completado tu análisis, proporciona un nombre descriptivo y una breve descripción de la parte explicada del repositiorio o del endpoint en formato JSON para cada parte del repositorio.es importante que responda con un nombre descriptivo como key y el contenido de la explicacion como value. 

por ejemplo :

<response>
{
    "nameDelTema": "description"
}
</response>

recuerde que esta creando una documentacion de un repositorio y debe ser lo mas claro posible,
Es muy importante que los nombres de los temas o titulos no lleven espacios, renplace los espacios por un - y no pueden tener / o extensiones con .js o ts, reempace los / en las key de los nombre.

En el caso de que crea que que un varios descripciones estan relacionada a un tema de responder de la siguiente manera por ejemplo :

<response>
{
    "nameDelTema": "description"
    "nameDelTema": {
        "nameDelTemaComun": "description",
        "nameDelTemaComun": "description"
        "nameDelTemaComun": "description"
    }
}
</response>

Here is the repository to analyze:
<repository>
${repo}
</repository>
`;

export const generateMetaPrompt = (documentation) => `
  Genera una configuración en formato JSON para la siguiente documentación proporcionada. Incluye títulos para cada sección y tema, y cualquier configuración adicional necesaria para Nextra.

  Documentación:

  ${documentation}

  Ejemplo de respuesta:

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
