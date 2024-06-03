export const generateDocumentationPrompt = (repo) => `Carefully read the repository provided in JSON format, where each entry includes the path and the content of the files and folders. Summarize each part, identifying the endpoints involved and all relevant sections of the repository. Your task is to create high-level documentation, providing clear and detailed explanations to ensure thorough understanding.

1. Project Overview:
   • Describe the purpose and scope of the project. Explain what the project aims to achieve and its primary functionalities.
2. Endpoints:
   • Identify and describe all endpoints in the repository. For each endpoint, provide details on its purpose, inputs, outputs, and any other relevant information. Include code examples where appropriate.
3. Key Components:
   • Break down the key components of the repository. Identify the most important parts of the project and explain them in detail. This may include modules, classes, functions, or any significant pieces of code. Include code examples to illustrate functionality.
4. Detailed Explanations:
   • For each part of the repository, provide a high-level explanation. Describe its functionality, how it fits into the overall project, and any dependencies it may have. Include any other information that will help in understanding that part of the project. Provide examples where applicable.

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

When creating examples or including code snippets in the documentation, ensure that the code is properly formatted according to the language. Use the appropriate code block syntax for each language. For example:

- For JavaScript:
\`\`\`js
console.log("Hello, world!");
\`\`\`

- For Python:
\`\`\`python
print("Hello, world!")
\`\`\`

- For HTML:
\`\`\`html
<!DOCTYPE html>
<html>
<head>
    <title>Hello, world!</title>
</head>
<body>
    <h1>Hello, world!</h1>
</body>
</html>
\`\`\`

Always wrap the code within triple backticks followed by the language identifier to ensure proper syntax highlighting in the documentation. Remember, the examples should be representative and relevant to the functionality described.

Repository:

${repo}

Descriptions can be generated in markdown format.

`

export const generateMetaPrompt = (documentation) => `
Generate a configuration in JSON format for the provided documentation. Include titles for each section and topic, and any additional configuration necessary for Nextra. Follow the guidelines below:

1. **Title Configuration**:
   - For each section, provide a descriptive title.
   - For each topic within a section, provide a detailed title.

2. **Page Structure**:
   - Define the structure of the documentation hierarchically.
   - Include sections and nested topics with clear paths.

3. **Additional Configuration**:
   - Include any relevant metadata or settings required by Nextra.

Use the following JSON format:

{
  "title": "Project Documentation",
  "sections": [
    {
      "title": "Introduction",
      "topics": [
        {
          "title": "Overview",
          "path": "introduction/overview",
          "description": "Overview of the project and its goals."
        },
        {
          "title": "Getting Started",
          "path": "introduction/getting-started",
          "description": "Instructions to get started with the project."
        }
      ]
    },
    {
      "title": "API Endpoints",
      "topics": [
        {
          "title": "Authentication",
          "path": "api/authentication",
          "description": "Endpoints related to user authentication."
        },
        {
          "title": "Data Management",
          "path": "api/data-management",
          "description": "Endpoints for managing project data."
        }
      ]
    },
    {
      "title": "Components",
      "topics": [
        {
          "title": "UI Components",
          "path": "components/ui-components",
          "description": "Details about the UI components used in the project."
        },
        {
          "title": "Backend Services",
          "path": "components/backend-services",
          "description": "Description of backend services and their functionalities."
        }
      ]
    }
  ],
  "settings": {
    "theme": "dark",
    "sidebarDepth": 2
  }
}

Ensure the JSON is well-structured, clear, and includes all necessary titles and configurations for Nextra.

Documentation:
${documentation}
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

 
    ### Important Guidelines:

	•	Ensure the documentation is clear, concise, and easy to understand.
	•	Use descriptive names for keys without spaces, replacing spaces with hyphens.
	•	Avoid using special characters like / or file extensions like .js or .ts in the keys.
	•	Provide accurate and detailed explanations for each part of the repository, including examples.

### Here is the repository to analyze:

${repo}

`;
