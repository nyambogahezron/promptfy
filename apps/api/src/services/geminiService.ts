import { GoogleGenerativeAI } from '@google/generative-ai';

class GeminiService {
	private client: GoogleGenerativeAI;
	private model: string = 'gemini-pro';

	constructor() {
		const apiKey = process.env.GEMINI_API_KEY;

		if (!apiKey) {
			throw new Error('GEMINI_API_KEY is not defined in environment variables');
		}

		this.client = new GoogleGenerativeAI(apiKey);
	}

	/**
	 * Generate a prompt based on user instructions and template
	 * @param userInstructions - User's instructions for generating the prompt
	 * @param template - Template to structure the prompt generation
	 * @returns Generated prompt text
	 */
	async generatePrompt(
		userInstructions: string,
		template: string
	): Promise<string> {
		try {
			const model = this.client.getGenerativeModel({ model: this.model });

			// Create prompt combining the template and user instructions
			const prompt = `
${template}

User Instructions: ${userInstructions}

Generate a well-structured, detailed prompt following the template format above and incorporating the user instructions.
Make sure the prompt is comprehensive, specific, and provides clear guidance.
Include all necessary context, requirements, and constraints from the user instructions.
Ensure your response is formatted properly and ready to be used directly as a prompt.
`;

			const result = await model.generateContent(prompt);
			const response = result.response;
			const text = response.text();

			return text;
		} catch (error: any) {
			console.error('Error generating prompt with Gemini:', error.message);
			throw new Error(`Failed to generate prompt: ${error.message}`);
		}
	}

	/**
	 * Enhance an existing prompt with additional context or improvements
	 * @param existingPrompt - The existing prompt text
	 * @param enhancementRequest - Specific requests for enhancement
	 * @returns Enhanced prompt text
	 */
	async enhancePrompt(
		existingPrompt: string,
		enhancementRequest: string
	): Promise<string> {
		try {
			const model = this.client.getGenerativeModel({ model: this.model });

			const prompt = `
Here is an existing prompt:
"""
${existingPrompt}
"""

Enhancement request: ${enhancementRequest}

Please enhance this prompt according to the enhancement request while preserving its original intent and structure.
`;

			const result = await model.generateContent(prompt);
			const response = result.response;
			const text = response.text();

			return text;
		} catch (error: any) {
			console.error('Error enhancing prompt with Gemini:', error.message);
			throw new Error(`Failed to enhance prompt: ${error.message}`);
		}
	}

	/**
	 * Analyze a prompt for effectiveness and provide suggestions
	 * @param promptText - The prompt text to analyze
	 * @returns Analysis and suggestions for prompt improvement
	 */
	async analyzePrompt(promptText: string): Promise<string> {
		try {
			const model = this.client.getGenerativeModel({ model: this.model });

			const prompt = `
Please analyze the following prompt for clarity, specificity, and effectiveness:
"""
${promptText}
"""

Provide specific suggestions for improvement in these areas:
1. Clarity - Is the prompt clear about what it's asking for?
2. Specificity - Does it provide enough context and constraints?
3. Structure - Is it well-organized and easy to follow?
4. Language - Is it using precise, unambiguous language?
5. Overall effectiveness - Will it likely generate useful responses?

Format your analysis with concrete suggestions for each area.
`;

			const result = await model.generateContent(prompt);
			const response = result.response;
			const text = response.text();

			return text;
		} catch (error: any) {
			console.error('Error analyzing prompt with Gemini:', error.message);
			throw new Error(`Failed to analyze prompt: ${error.message}`);
		}
	}
}

export default GeminiService;
