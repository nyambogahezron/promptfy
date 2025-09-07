import { GoogleGenerativeAI } from "@google/generative-ai";

// This would normally be in environment variables
const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "your-api-key-here";

const genAI = new GoogleGenerativeAI(API_KEY);

export class GeminiService {
	private model = genAI.getGenerativeModel({ model: "gemini-pro" });

	async enhancePrompt(prompt: string): Promise<{
		score: number;
		improvements: string[];
		optimizedVersion: string;
		variations: string[];
	}> {
		try {
			const enhancementPrompt = `
        Analyze the following AI prompt and provide:
        1. A clarity and effectiveness score (0-100)
        2. 3-5 specific improvement suggestions
        3. An optimized version of the prompt
        4. 3 variations with different approaches

        Prompt to analyze: "${prompt}"

        Please format your response as JSON with the following structure:
        {
          "score": number,
          "improvements": ["improvement1", "improvement2", ...],
          "optimizedVersion": "optimized prompt text",
          "variations": ["variation1", "variation2", "variation3"]
        }
      `;

			const result = await this.model.generateContent(enhancementPrompt);
			const response = await result.response;
			const text = response.text();

			// Extract JSON from the response
			const jsonMatch = text.match(/\{[\s\S]*\}/);
			if (jsonMatch) {
				return JSON.parse(jsonMatch[0]);
			}

			throw new Error("Invalid response format");
		} catch (error) {
			console.error("Error enhancing prompt:", error);
			throw error;
		}
	}

	async generatePromptVariations(prompt: string, count: number = 3): Promise<string[]> {
		try {
			const variationPrompt = `
        Generate ${count} creative variations of this AI prompt, each with a different approach or style:
        "${prompt}"
        
        Return only the variations as a JSON array of strings.
      `;

			const result = await this.model.generateContent(variationPrompt);
			const response = await result.response;
			const text = response.text();

			const jsonMatch = text.match(/\[[\s\S]*\]/);
			if (jsonMatch) {
				return JSON.parse(jsonMatch[0]);
			}

			throw new Error("Invalid response format");
		} catch (error) {
			console.error("Error generating variations:", error);
			throw error;
		}
	}
}

export const geminiService = new GeminiService();
