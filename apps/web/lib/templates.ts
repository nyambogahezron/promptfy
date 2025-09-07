import type { PromptTemplate } from "@/types/prompt";

export const promptTemplates: PromptTemplate[] = [
	{
		id: "1",
		title: "Creative Writing Assistant",
		description: "Generate creative stories, poems, or narratives",
		content:
			"Write a compelling [GENRE] story about [MAIN_CHARACTER] who faces [CONFLICT]. Include vivid descriptions, engaging dialogue, and a satisfying resolution. Target length: [LENGTH] words.",
		category: "creative",
		tags: ["storytelling", "narrative", "fiction"],
	},
	{
		id: "2",
		title: "Code Review & Optimization",
		description: "Analyze and improve code quality",
		content:
			"Review the following [LANGUAGE] code for:\n1. Performance optimizations\n2. Best practices compliance\n3. Security vulnerabilities\n4. Code readability improvements\n\nProvide specific suggestions with explanations:\n\n[CODE_BLOCK]",
		category: "coding",
		tags: ["code-review", "optimization", "programming"],
	},
	{
		id: "3",
		title: "Business Strategy Analysis",
		description: "Analyze business scenarios and provide strategic insights",
		content:
			"Analyze the following business scenario and provide strategic recommendations:\n\nCompany: [COMPANY_NAME]\nIndustry: [INDUSTRY]\nChallenge: [CHALLENGE]\n\nProvide:\n1. SWOT analysis\n2. Market opportunities\n3. Actionable recommendations\n4. Risk assessment",
		category: "business",
		tags: ["strategy", "analysis", "business-planning"],
	},
	{
		id: "4",
		title: "Educational Content Creator",
		description: "Create engaging educational materials",
		content:
			"Create comprehensive educational content about [TOPIC] for [TARGET_AUDIENCE].\n\nInclude:\n1. Learning objectives\n2. Key concepts with examples\n3. Interactive exercises\n4. Assessment questions\n5. Additional resources\n\nMake it engaging and age-appropriate.",
		category: "education",
		tags: ["learning", "teaching", "curriculum"],
	},
	{
		id: "5",
		title: "Data Analysis Assistant",
		description: "Analyze data patterns and generate insights",
		content:
			"Analyze the following dataset and provide insights:\n\nDataset: [DATASET_DESCRIPTION]\nKey metrics: [METRICS]\nTime period: [TIME_PERIOD]\n\nProvide:\n1. Key trends and patterns\n2. Statistical summary\n3. Anomalies or outliers\n4. Actionable insights\n5. Visualization recommendations",
		category: "analytics",
		tags: ["data-analysis", "statistics", "insights"],
	},
	{
		id: "6",
		title: "Content Marketing Optimizer",
		description: "Create and optimize marketing content",
		content:
			"Create compelling marketing content for [PRODUCT/SERVICE]:\n\nTarget audience: [AUDIENCE]\nPlatform: [PLATFORM]\nGoal: [MARKETING_GOAL]\n\nGenerate:\n1. Engaging headline options\n2. Value proposition\n3. Call-to-action\n4. Hashtags/keywords\n5. Content calendar suggestions",
		category: "marketing",
		tags: ["content-marketing", "copywriting", "seo"],
	},
];

export const categories = [
	{ id: "creative", name: "Creative Writing", color: "bg-purple-500", count: 0 },
	{ id: "coding", name: "Programming", color: "bg-blue-500", count: 0 },
	{ id: "business", name: "Business", color: "bg-green-500", count: 0 },
	{ id: "education", name: "Education", color: "bg-yellow-500", count: 0 },
	{ id: "analytics", name: "Analytics", color: "bg-red-500", count: 0 },
	{ id: "marketing", name: "Marketing", color: "bg-pink-500", count: 0 },
	{ id: "other", name: "Other", color: "bg-gray-500", count: 0 },
];
