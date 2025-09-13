import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/components/auth-provider";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/ui/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "PromptCraft | Professional AI Prompt Engineering Platform",
	description:
		"Create, optimize, and manage AI prompts with intelligent suggestions powered by Google Gemini. Professional templates, analytics, and collaboration tools for teams.",
	keywords:
		"AI prompts, prompt engineering, AI tools, prompt optimization, Gemini AI, content creation, business automation",
	authors: [{ name: "PromptCraft Team" }],
	openGraph: {
		title: "PromptCraft - Professional AI Prompt Engineering Platform",
		description:
			"Transform your AI communication with intelligent prompt creation, optimization, and management tools. Trusted by 10,000+ professionals worldwide.",
		type: "website",
		url: "https://promptcraft.ai",
		siteName: "PromptCraft",
		images: [
			{
				url: "/og-image.jpg",
				width: 1200,
				height: 630,
				alt: "PromptCraft - AI Prompt Engineering Platform",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "PromptCraft - Professional AI Prompt Engineering",
		description:
			"Create perfect AI prompts with intelligent suggestions and professional templates.",
		images: ["/twitter-image.jpg"],
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	verification: {
		google: "your-google-verification-code",
	},
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={inter.className}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<AuthProvider>
						{children}
						<Toaster />
					</AuthProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
