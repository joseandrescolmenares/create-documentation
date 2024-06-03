export const generateDocumentationPrompt = (repo) => `
Carefully read the repository provided in JSON format, summarize each part, identifying the endpoints involved and all relevant sections of the repository. Your task is to create high-level documentation, providing clear and detailed explanations to ensure thorough understanding.

1.	Project Overview:
	•	Describe the purpose and scope of the project. Explain what the project aims to achieve and its primary functionalities.
	2.	Endpoints:
	•	Identify and describe all endpoints in the repository. For each endpoint, provide details on its purpose, inputs, outputs, and any other relevant information. Include code examples where appropriate.
	3.	Key Components:
	•	Break down the key components of the repository. Identify the most important parts of the project and explain them in detail. This may include modules, classes, functions, or any significant pieces of code. Include code examples to illustrate functionality.
	4.	Detailed Explanations:
	•	For each part of the repository, provide a high-level explanation. Describe its functionality, how it fits into the overall project, and any dependencies it may have. Include any other information that will help in understanding that part of the project. Provide examples where applicable.

When providing your responses, use the following JSON format:
{
    "index": "Project overview and description",
    "endpoints": {
        "endpoint1": {
            "description": "Description of endpoint 1",
            "example": "Code example for endpoint 1"
        },
        "endpoint2": {
            "description": "Description of endpoint 2",
            "example": "Code example for endpoint 2"
        },
        ...
    },
    "key_components": {
        "component1": {
            "description": "Description of component 1",
            "example": "Code example for component 1"
        },
        "component2": {
            "description": "Description of component 2",
            "example": "Code example for component 2"
        },
        ...
    },
    "detailed_explanations": {
        "section1": {
            "description": "Detailed explanation of section 1",
            "example": "Code example for section 1"
        },
        "section2": {
            "description": "Detailed explanation of section 2",
            "example": "Code example for section 2"
        },
        ...
    }
}
Make sure that the keys for each section are descriptive and that the values provide clear, concise, and detailed information. If multiple descriptions are related to the same topic, combine them into a single entry using nested JSON objects.

For example:
{
    "index": "Description of the repository",
    "name_of_topic": "Description",
    "name_of_topic": {
        "common_topic_name": "Description",
        "common_topic_name": "Description",
        "common_topic_name": "Description"
    }
}

Ensure that the names of the topics or titles do not contain spaces (replace spaces with hyphens) and do not include / or file extensions like .js or .ts (replace / with - in the keys).

Repository:

${repo}

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

export const scrapingGithubPrompt = (repo) => `
You are an engineer specialized in generating detailed and accurate documentation from code repositories. Follow the instructions below to analyze the provided repository and create a comprehensive documentation summary.

	1.	Analyze the repository:
	•	Carefully examine the repository contents, including files, folders, and code.
	•	Identify all endpoints, functionality, and key components within the repository.
	2.	Describe the project:
	•	Start with a high-level overview of what the project is about.
	•	Provide a summary of each major component, functionality, or endpoint within the repository.
	3.	Detailed explanation:
	•	Break down each component or endpoint, explaining its purpose, functionality, and how it fits into the overall project.
	•	Highlight any important details, configuration, or usage instructions.
	•	Include code examples demonstrating how to interact with each endpoint and component.
	4.	Generate documentation in JSON format:
	•	For each part of the repository, create a JSON object with a descriptive key (no spaces, replace spaces with dashes, and avoid special characters such as / or file extensions such as .js or .ts).
	•	The value should be a detailed description of the part, including examples where applicable.
	5.	Combine related descriptions:
	•	If several descriptions are related to the same topic or component, nest them under a common key.
	6.	Example output:

    {
        "index": "High-level overview of the repository, describing its purpose and main functionalities.",
        "main-endpoint": {
          "description": "Description of the main endpoint, its functionality, and usage.",
          "example": "Code example for the main endpoint"
        },
        "authentication": {
          "login-endpoint": {
            "description": "Description of the login endpoint, its parameters, and responses.",
            "example": "Code example for the login endpoint"
          },
          "register-endpoint": {
            "description": "Description of the register endpoint, its parameters, and responses.",
            "example": "Code example for the register endpoint"
          }
        },
        "database-configuration": {
          "description": "Details about database configuration, including connection settings and schema information.",
          "example": "Code example for database configuration"
        }
      }
      Important Guidelines:

	•	Ensure the documentation is clear, concise, and easy to understand.
	•	Use descriptive names for keys without spaces, replacing spaces with hyphens.
	•	Avoid using special characters like / or file extensions like .js or .ts in the keys.
	•	Provide accurate and detailed explanations for each part of the repository, including examples.

### Here is the repository to analyze:

${repo}

`