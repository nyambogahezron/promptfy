import type { Prompt } from "@/types/prompt";

const STORAGE_KEY = "ai-prompts";

interface PersistedPrompt {
	id: string;
	title: string;
	content: string;
	category: string;
	tags: string[];
	isFavorite: boolean;
	createdAt: string;
	updatedAt: string;
}

export function getPrompts(): Prompt[] {
	if (typeof window === "undefined") return [];

	try {
		const stored = localStorage.getItem(STORAGE_KEY);
		return stored
			? JSON.parse(stored).map((p: PersistedPrompt) => ({
					...p,
					createdAt: new Date(p.createdAt),
					updatedAt: new Date(p.updatedAt),
				}))
			: [];
	} catch (error) {
		console.error("Error loading prompts:", error);
		return [];
	}
}

export function savePrompts(prompts: Prompt[]): void {
	if (typeof window === "undefined") return;

	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(prompts));
	} catch (error) {
		console.error("Error saving prompts:", error);
	}
}

export function addPrompt(prompt: Omit<Prompt, "id" | "createdAt" | "updatedAt">): Prompt {
	const newPrompt: Prompt = {
		...prompt,
		id: Date.now().toString(),
		createdAt: new Date(),
		updatedAt: new Date(),
	};

	const prompts = getPrompts();
	prompts.unshift(newPrompt);
	savePrompts(prompts);

	return newPrompt;
}

export function updatePrompt(id: string, updates: Partial<Prompt>): void {
	const prompts = getPrompts();
	const index = prompts.findIndex((p) => p.id === id);

	if (index !== -1) {
		prompts[index] = {
			...prompts[index],
			...updates,
			updatedAt: new Date(),
		};
		savePrompts(prompts);
	}
}

export function deletePrompt(id: string): void {
	const prompts = getPrompts();
	const filtered = prompts.filter((p) => p.id !== id);
	savePrompts(filtered);
}

export function exportPrompts(format: "json" | "txt" | "md"): string {
	const prompts = getPrompts();

	switch (format) {
		case "json":
			return JSON.stringify(prompts, null, 2);

		case "txt":
			return prompts
				.map(
					(p) =>
						`Title: ${p.title}\nCategory: ${p.category}\nTags: ${p.tags.join(", ")}\nContent:\n${p.content}\n\n---\n\n`
				)
				.join("");

		case "md":
			return prompts
				.map(
					(p) =>
						`# ${p.title}\n\n**Category:** ${p.category}\n**Tags:** ${p.tags.join(", ")}\n**Created:** ${p.createdAt.toLocaleDateString()}\n\n## Content\n\n${p.content}\n\n---\n\n`
				)
				.join("");

		default:
			return JSON.stringify(prompts, null, 2);
	}
}
