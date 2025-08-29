import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error('Gemini API key is missing. Please add it to your environment variables.');
}

const genAI = new GoogleGenerativeAI(API_KEY as string);

const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

export const generatePrompts = async (category: string): Promise<string[]> => {
  const prompt = `Generate 5 creative and engaging prompts for the category: "${category}". Return the prompts as a JSON array of strings.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    // Clean the response to ensure it's a valid JSON array
    const cleanedText = text.replace(/```json\n|\n```/g, '').trim();
    const prompts = JSON.parse(cleanedText);
    return prompts;
  } catch (error) {
    console.error('Error generating prompts:', error);
    return [];
  }
};
