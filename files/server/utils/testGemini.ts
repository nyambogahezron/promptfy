import dotenv from 'dotenv';
dotenv.config();
import GeminiService from '../services/geminiService';

/**
 * Simple utility to test the Gemini service
 */
async function testGeminiService() {
	try {
		console.log('Testing Gemini service...');

		// Check if API key is set
		if (!process.env.GEMINI_API_KEY) {
			console.error(
				'Error: GEMINI_API_KEY is not defined in environment variables'
			);
			process.exit(1);
		}

		// Create a mock template and user instructions
		const mockTemplate = `# Prompt Structure
1. Context: [Brief background information that helps understand the scenario]
2. Task: [Clear statement of what needs to be achieved]
3. Details: [Specific requirements, constraints, or parameters]
4. Tone/Style: [How the output should sound or look]
5. Format: [How the response should be structured]`;

		const mockUserInstructions =
			'I need a prompt that helps me write a compelling cover letter for a software developer position at a tech startup.';

		// Initialize the service
		console.log('Initializing GeminiService...');
		const geminiService = new GeminiService();

		// Generate a prompt
		console.log('Generating prompt...');
		const generatedPrompt = await geminiService.generatePrompt(
			mockUserInstructions,
			mockTemplate
		);

		console.log('\n--- Generated Prompt ---\n');
		console.log(generatedPrompt);
		console.log('\n------------------------\n');

		console.log('Test completed successfully!');
		process.exit(0);
	} catch (error: any) {
		console.error('Error testing Gemini service:', error.message);
		process.exit(1);
	}
}

// Run the test
testGeminiService();
