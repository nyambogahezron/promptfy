import PromptTemplate from '../models/PromptTemplate';

const defaultTemplates = [
	{
		name: 'General Purpose',
		description:
			'A versatile template for generating well-structured prompts for any purpose',
		template: `# Prompt Structure
1. Context: [Brief background information that helps understand the scenario]
2. Task: [Clear statement of what needs to be achieved]
3. Details: [Specific requirements, constraints, or parameters]
4. Tone/Style: [How the output should sound or look]
5. Format: [How the response should be structured]
6. Examples: [Optional examples to clarify expectations]`,
		category: 'Other',
		isDefault: true,
	},
	{
		name: 'Programming Assistant',
		description:
			'Template for generating programming-related prompts that yield helpful code solutions',
		template: `# Programming Task Prompt
1. Problem Statement: [Clear description of the programming problem]
2. Technical Context: [Programming language, framework, libraries, versions]
3. Requirements: [Specific functionality needs or constraints]
4. Expected Input/Output: [Examples of inputs and expected outputs]
5. Code Style Preferences: [Coding conventions, patterns to use/avoid]
6. Performance Considerations: [Any efficiency or scaling requirements]
7. Error Handling: [How errors should be managed]`,
		category: 'Programming',
		isDefault: true,
	},
	{
		name: 'Creative Writing',
		description:
			'Template for crafting prompts that generate creative writing pieces',
		template: `# Creative Writing Prompt
1. Genre/Style: [The literary genre or writing style]
2. Main Concept: [Central idea, character, or situation]
3. Setting Details: [Time period, location, atmosphere]
4. Character Elements: [Key characters or character traits]
5. Plot Guidance: [Story arc suggestions or key events]
6. Tone/Mood: [Emotional tone of the piece]
7. Constraints/Challenges: [Word count, required elements, or special constraints]`,
		category: 'Creative',
		isDefault: true,
	},
	{
		name: 'Business Document',
		description: 'Template for generating professional business documents',
		template: `# Business Document Prompt
1. Document Type: [Report, proposal, analysis, plan, memo, etc.]
2. Purpose: [Clear statement of the document's objective]
3. Target Audience: [Who will read this document and what they need]
4. Key Information: [Essential data, findings, or points to include]
5. Structure Requirements: [Specific sections or formatting needs]
6. Company Context: [Relevant background about the organization]
7. Tone & Formality: [Expected level of formality and professional tone]
8. Call to Action: [What the reader should understand or do]`,
		category: 'Business',
		isDefault: true,
	},
	{
		name: 'Academic Writing',
		description: 'Template for scholarly and educational content',
		template: `# Academic Writing Prompt
1. Academic Field: [Subject area or discipline]
2. Document Type: [Essay, research paper, literature review, thesis section]
3. Research Question/Thesis: [Central question or argument]
4. Required Sources: [Types of sources or specific citations to include]
5. Methodological Approach: [Research or analytical method to employ]
6. Academic Level: [Undergraduate, graduate, PhD, etc.]
7. Citation Style: [APA, MLA, Chicago, etc.]
8. Structural Requirements: [Specific sections, word count, formatting]`,
		category: 'Academic',
		isDefault: true,
	},
	{
		name: 'Marketing Content',
		description: 'Template for creating effective marketing materials',
		template: `# Marketing Content Prompt
1. Content Type: [Ad copy, social post, email, blog post, etc.]
2. Product/Service: [What is being promoted]
3. Target Audience: [Demographics, interests, pain points]
4. Unique Selling Proposition: [Key differentiators or benefits]
5. Brand Voice: [Tone, style, and personality to convey]
6. Call to Action: [Desired audience response]
7. Platform Specifications: [Where this will appear, format constraints]
8. Performance Goals: [What this content should achieve]`,
		category: 'Marketing',
		isDefault: true,
	},
];

export async function seedDefaultTemplates() {
	try {
		// Check if default templates exist
		const existingCount = await PromptTemplate.countDocuments({
			isDefault: true,
		});

		if (existingCount > 0) {
			console.log(
				`${existingCount} default templates already exist. Skipping seeding.`
			);
			return;
		}

		// Insert default templates
		await PromptTemplate.insertMany(defaultTemplates);
		console.log(
			`Successfully seeded ${defaultTemplates.length} default templates`
		);
	} catch (error: any) {
		console.error('Error seeding default templates:', error.message);
		throw error;
	}
}
