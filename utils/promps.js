export const generateDocumentationPrompt = (
  repo
) => `You are tasked with generating high-level documentation from a provided repository in JSON format. Each entry in the JSON includes the path and the content of the files and folders. Your job is to summarize each part, identify the endpoints involved, and highlight all relevant sections of the repository. Create detailed and clear documentation to ensure a thorough understanding of the repository.

Instructions:

	1.	Project Overview:
	•	Describe the purpose and scope of the project.
	•	Explain what the project aims to achieve and its primary functionalities.
	2.	Endpoints:
	•	Identify and describe all endpoints in the repository.
	•	For each endpoint, provide details on its purpose, inputs, outputs, and any other relevant information.
	•	Include code examples where appropriate.
	3.	Key Components:
	•	Break down the key components of the repository.
	•	Identify the most important parts of the project and explain them in detail. This may include modules, classes, functions, or significant pieces of code.
	•	Include code examples to illustrate functionality.
	4.	Detailed Explanations:
	•	For each part of the repository, provide a high-level explanation.
	•	Describe its functionality, how it fits into the overall project, and any dependencies it may have.
	•	Include any other information that will help in understanding that part of the project.
	•	Provide examples where applicable.

Formatting Guidelines:

	•	Ensure the keys for each section are descriptive and the values provide clear, concise, and detailed information.
	•	Combine multiple related descriptions into a single entry using nested JSON objects.
	•	Use descriptive names for topics or titles without spaces (replace spaces with hyphens) and avoid using “/” or file extensions like “.js” or “.ts” (replace “/” with “-” in the keys).

Examples of Proper Formatting:

	•	For JavaScript:
  \`\`\`js
console.log(“Hello, world!”);
\`\`\`
	•	For Python:
  \`\`\`python
print(“Hello, world!”)
\`\`\`
	•	For HTML:
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

JSON Output Structure:
{
  "index": "Project overview and description",
  "endpoints": {
    "nameDescriptive": 
    "##Title:
     Description of endpoint 1.
     ## Example:
     Code example for endpoint 1.
     ##Title2:
     Description of endpoint 2.
     ## Example:
     Code example for endpoint 2. ..."
  },
  "key_components": {
    "nameDescriptive":
    "##Title:
     Description of component 1.
     ## Example:
     Code example for component 1.
     ##Title2:
     Description of component 2.
     ## Example:
     Code example for component 2. ..."
  },
  "detailed_explanations": {
    "nameDescriptive":
    "##Title:
     Detailed explanation of section 1.
     ## Example:
     Code example for section 1.
     ##Title2:
     Detailed explanation of section 2.
     ## Example:
     Code example for section 2. ..."
  }
}

Use the repository provided in JSON format:

${repo}

Generate the descriptions in markdown format and return the result in JSON format as specified above

`;

export const generateMetaPrompt = (documentation) => `
Generate a JSON configuration for the provided documentation, including titles for each section and topic based solely on the information available. Follow these guidelines:

	1.	Titles: Provide descriptive titles for each section and detailed titles for each topic based on the documentation.
	2.	Structure: Define the hierarchical structure of the documentation, including sections and nested topics with clear paths derived from the provided content.
	3.	Settings: Include relevant metadata or settings required by Nextra.

Ensure the JSON is well-structured, clear, and includes all necessary titles and configurations based on the provided documentation.

Documentation:
${documentation}

Return in JSON format.
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
