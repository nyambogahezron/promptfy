import { type NextRequest, NextResponse } from "next/server";
import { geminiService } from "@/lib/gemini";

export async function POST(request: NextRequest) {
	try {
		const { prompt, action } = await request.json();

		if (!prompt || !action) {
			return NextResponse.json({ error: "Missing prompt or action parameter" }, { status: 400 });
		}

		switch (action) {
			case "enhance": {
				const enhancement = await geminiService.enhancePrompt(prompt);
				return NextResponse.json(enhancement);
			}

			case "variations": {
				const variations = await geminiService.generatePromptVariations(prompt);
				return NextResponse.json({ variations });
			}

			default:
				return NextResponse.json(
					{ error: 'Invalid action. Use "enhance" or "variations"' },
					{ status: 400 }
				);
		}
	} catch (error) {
		console.error("Gemini API error:", error);
		return NextResponse.json(
			{ error: "Failed to process request. Please check your API configuration." },
			{ status: 500 }
		);
	}
}
