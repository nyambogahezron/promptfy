"use client";

import { motion, useInView } from "framer-motion";
import {
	ArrowRight,
	BarChart,
	Brain,
	Briefcase,
	Check,
	ChevronRight,
	Code,
	Download,
	FileText,
	Github,
	Globe,
	GraduationCap,
	Lightbulb,
	Linkedin,
	Mail,
	Megaphone,
	MessageSquare,
	Palette,
	PenTool,
	Play,
	Rocket,
	Search,
	Sparkles,
	Star,
	Target,
	TrendingUp,
	Twitter,
	Users,
} from "lucide-react";
import Link from "next/link";
import type React from "react";
import { useId, useRef } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const fadeInUp = {
	initial: { opacity: 0, y: 60 },
	animate: { opacity: 1, y: 0 },
	transition: { duration: 0.6, ease: "easeOut" },
};

const staggerContainer = {
	animate: {
		transition: {
			staggerChildren: 0.1,
		},
	},
};

function AnimatedSection({
	children,
	className = "",
	...rest
}: React.ComponentProps<typeof motion.div> & {
	children: React.ReactNode;
}) {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: "-100px" });

	return (
		<motion.div
			ref={ref}
			initial={{ opacity: 0, y: 60 }}
			animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
			transition={{ duration: 0.6, ease: "easeOut" }}
			className={className}
			{...rest}
		>
			{children}
		</motion.div>
	);
}

export default function Home() {
	const featuresId = useId();
	const showcaseId = useId();
	const pricingId = useId();
	const blogId = useId();
	const contactId = useId();
	const firstNameId = useId();
	const lastNameId = useId();
	const emailId = useId();
	const subjectId = useId();
	const messageId = useId();

	const features = [
		{
			icon: Brain,
			title: "AI-Powered Enhancement",
			description:
				"Get intelligent suggestions and optimization recommendations powered by Google's Gemini AI",
		},
		{
			icon: FileText,
			title: "Rich Prompt Editor",
			description:
				"Intuitive editor with real-time preview, character counting, and formatting tools",
		},
		{
			icon: Palette,
			title: "Professional Templates",
			description: "Pre-built templates for creative writing, coding, business analysis, and more",
		},
		{
			icon: Search,
			title: "Smart Organization",
			description: "Advanced search, filtering, tagging, and categorization system",
		},
		{
			icon: TrendingUp,
			title: "Performance Analytics",
			description: "Track prompt effectiveness with scoring and detailed improvement insights",
		},
		{
			icon: Download,
			title: "Export & Share",
			description: "Export prompts in multiple formats (JSON, TXT, Markdown) for easy sharing",
		},
	];

	const useCases = [
		{
			icon: PenTool,
			title: "Creative Writing",
			description: "Craft compelling stories, poems, and creative content with AI assistance",
			color: "bg-purple-500",
		},
		{
			icon: Code,
			title: "Programming",
			description: "Generate code reviews, documentation, and technical explanations",
			color: "bg-blue-500",
		},
		{
			icon: Briefcase,
			title: "Business Strategy",
			description: "Create strategic analyses, market research, and business plans",
			color: "bg-green-500",
		},
		{
			icon: GraduationCap,
			title: "Education",
			description: "Develop learning materials, assessments, and educational content",
			color: "bg-yellow-500",
		},
		{
			icon: BarChart,
			title: "Data Analysis",
			description: "Generate insights, reports, and data-driven recommendations",
			color: "bg-red-500",
		},
		{
			icon: Megaphone,
			title: "Marketing",
			description: "Create compelling copy, campaigns, and content strategies",
			color: "bg-pink-500",
		},
	];

	const testimonials = [
		{
			name: "Sarah Chen",
			role: "Content Creator",
			company: "Digital Marketing Agency",
			content:
				"This tool has revolutionized how I create prompts. The AI suggestions are incredibly helpful and have improved my content quality by 300%.",
			rating: 5,
			avatar:
				"https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
		},
		{
			name: "Marcus Rodriguez",
			role: "Software Engineer",
			company: "Tech Startup",
			content:
				"The template system and code review prompts have streamlined our development process. It's like having an AI assistant that understands our workflow.",
			rating: 5,
			avatar:
				"https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
		},
		{
			name: "Dr. Emily Watson",
			role: "Research Analyst",
			company: "University",
			content:
				"The analytical prompts and scoring system help me create more effective research queries. It's an invaluable tool for academic work.",
			rating: 5,
			avatar:
				"https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
		},
	];

	const pricingPlans = [
		{
			name: "Starter",
			price: "Free",
			description: "Perfect for individuals getting started",
			features: [
				"Up to 50 prompts",
				"Basic templates",
				"Standard export formats",
				"Community support",
			],
			cta: "Get Started",
			popular: false,
		},
		{
			name: "Professional",
			price: "$19",
			period: "/month",
			description: "For professionals and content creators",
			features: [
				"Unlimited prompts",
				"AI enhancement features",
				"Premium templates",
				"Advanced analytics",
				"Priority support",
				"Team collaboration",
			],
			cta: "Start Free Trial",
			popular: true,
		},
		{
			name: "Enterprise",
			price: "Custom",
			description: "For teams and organizations",
			features: [
				"Everything in Professional",
				"Custom integrations",
				"Advanced security",
				"Dedicated support",
				"Training & onboarding",
				"SLA guarantee",
			],
			cta: "Contact Sales",
			popular: false,
		},
	];

	const blogPosts = [
		{
			title: "10 Best Practices for AI Prompt Engineering",
			excerpt:
				"Learn the essential techniques for creating effective AI prompts that deliver consistent, high-quality results.",
			date: "Dec 15, 2024",
			readTime: "5 min read",
			category: "Tutorial",
			image:
				"https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop",
		},
		{
			title: "How AI is Transforming Content Creation",
			excerpt:
				"Explore the latest trends in AI-powered content creation and how professionals are leveraging these tools.",
			date: "Dec 12, 2024",
			readTime: "7 min read",
			category: "Industry",
			image:
				"https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop",
		},
		{
			title: "Case Study: 300% Improvement in Content Quality",
			excerpt:
				"See how a marketing agency used our platform to dramatically improve their content creation process.",
			date: "Dec 10, 2024",
			readTime: "4 min read",
			category: "Case Study",
			image:
				"https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop",
		},
	];

	return (
		<div className="min-h-screen bg-background">
			{/* Navigation */}
			<nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
				<div className="container mx-auto px-4 py-4">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
								<Sparkles className="h-5 w-5 text-white" />
							</div>
							<span className="text-xl font-bold">PromptCraft</span>
						</div>

						<div className="hidden md:flex items-center gap-8">
							<Link
								href="#features"
								className="text-sm font-medium hover:text-primary transition-colors"
							>
								Features
							</Link>
							<Link
								href="#showcase"
								className="text-sm font-medium hover:text-primary transition-colors"
							>
								Use Cases
							</Link>
							<Link
								href="#pricing"
								className="text-sm font-medium hover:text-primary transition-colors"
							>
								Pricing
							</Link>
							<Link
								href="#blog"
								className="text-sm font-medium hover:text-primary transition-colors"
							>
								Blog
							</Link>
							<Link
								href="#contact"
								className="text-sm font-medium hover:text-primary transition-colors"
							>
								Contact
							</Link>
						</div>

						<div className="flex items-center gap-4">
							<ThemeToggle />
							<Button variant="outline" size="sm">
								Sign In
							</Button>
							<Button size="sm">Get Started</Button>
						</div>
					</div>
				</div>
			</nav>

			{/* Hero Section */}
			<section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
				<div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />
				<div className="container mx-auto px-4 py-24 relative">
					<motion.div
						className="text-center max-w-4xl mx-auto"
						initial={{ opacity: 0, y: 40 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, ease: "easeOut" }}
					>
						<motion.div
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.6, delay: 0.2 }}
							className="mb-8"
						>
							<Badge variant="outline" className="mb-4 px-4 py-2">
								<Sparkles className="h-4 w-4 mr-2" />
								Powered by Google Gemini AI
							</Badge>
						</motion.div>

						<motion.h1
							className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.3 }}
						>
							Craft Perfect AI Prompts
						</motion.h1>

						<motion.p
							className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.4 }}
						>
							Create, optimize, and manage AI prompts with intelligent suggestions. Transform your
							ideas into powerful prompts that deliver exceptional results.
						</motion.p>

						<motion.div
							className="flex flex-col sm:flex-row gap-4 justify-center items-center"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.5 }}
						>
							<Button size="lg" className="text-lg px-8 py-6 group">
								Start Creating Free
								<ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
							</Button>
							<Button variant="outline" size="lg" className="text-lg px-8 py-6 group">
								<Play className="mr-2 h-5 w-5" />
								Watch Demo
							</Button>
						</motion.div>

						<motion.div
							className="mt-12 text-sm text-muted-foreground"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.8, delay: 0.6 }}
						>
							Join 10,000+ professionals creating better AI prompts
						</motion.div>
					</motion.div>
				</div>

				{/* Floating Elements */}
				<motion.div
					className="absolute top-20 left-10 w-20 h-20 bg-blue-200 dark:bg-blue-800 rounded-full opacity-20"
					animate={{ y: [0, -20, 0] }}
					transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
				/>
				<motion.div
					className="absolute bottom-20 right-10 w-32 h-32 bg-purple-200 dark:bg-purple-800 rounded-full opacity-20"
					animate={{ y: [0, 20, 0] }}
					transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
				/>
			</section>

			{/* About/Mission Section */}
			<AnimatedSection className="py-24 bg-background">
				<div className="container mx-auto px-4">
					<div className="max-w-4xl mx-auto text-center">
						<Badge variant="outline" className="mb-4">
							Our Mission
						</Badge>
						<h2 className="text-4xl font-bold mb-6">
							Empowering Everyone to Master AI Communication
						</h2>
						<p className="text-xl text-muted-foreground mb-12 leading-relaxed">
							We believe that effective AI communication shouldn't be limited to experts. Our
							platform democratizes prompt engineering, making it accessible to creators,
							professionals, and businesses of all sizes.
						</p>

						<div className="grid md:grid-cols-3 gap-8">
							<Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
								<CardContent className="p-8 text-center">
									<Target className="h-12 w-12 text-blue-500 mx-auto mb-4" />
									<h3 className="text-xl font-semibold mb-3">Precision</h3>
									<p className="text-muted-foreground">
										Create prompts that deliver exactly what you need, every time.
									</p>
								</CardContent>
							</Card>

							<Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
								<CardContent className="p-8 text-center">
									<Lightbulb className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
									<h3 className="text-xl font-semibold mb-3">Innovation</h3>
									<p className="text-muted-foreground">
										Stay ahead with cutting-edge AI enhancement technology.
									</p>
								</CardContent>
							</Card>

							<Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
								<CardContent className="p-8 text-center">
									<Users className="h-12 w-12 text-green-500 mx-auto mb-4" />
									<h3 className="text-xl font-semibold mb-3">Community</h3>
									<p className="text-muted-foreground">
										Join thousands of creators sharing knowledge and best practices.
									</p>
								</CardContent>
							</Card>
						</div>
					</div>
				</div>
			</AnimatedSection>

			{/* Features Section */}
			{/* Features Section */}
			<AnimatedSection id={featuresId} className="py-24 bg-muted/30">
				<div className="container mx-auto px-4">
					<div className="text-center mb-16">
						<Badge variant="outline" className="mb-4">
							Features
						</Badge>
						<h2 className="text-4xl font-bold mb-6">
							Everything You Need to Create Perfect Prompts
						</h2>
						<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
							Powerful tools and intelligent features designed to help you craft, optimize, and
							manage AI prompts like a pro.
						</p>
					</div>

					<motion.div
						className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
						variants={staggerContainer}
						initial="initial"
						whileInView="animate"
						viewport={{ once: true }}
					>
						{features.map((feature) => (
							<motion.div key={feature.title} variants={fadeInUp}>
								<Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
									<CardContent className="p-8">
										<feature.icon className="h-12 w-12 text-primary mb-4 group-hover:scale-110 transition-transform duration-300" />
										<h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
										<p className="text-muted-foreground leading-relaxed">{feature.description}</p>
									</CardContent>
								</Card>
							</motion.div>
						))}
					</motion.div>
				</div>
			</AnimatedSection>

			{/* Use Cases/Showcase Section */}
			{/* Use Cases/Showcase Section */}
			<AnimatedSection id={showcaseId} className="py-24 bg-background">
				<div className="container mx-auto px-4">
					<div className="text-center mb-16">
						<Badge variant="outline" className="mb-4">
							Use Cases
						</Badge>
						<h2 className="text-4xl font-bold mb-6">Perfect for Every Industry</h2>
						<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
							From creative writing to business strategy, our platform adapts to your specific needs
							and workflow.
						</p>
					</div>

					<motion.div
						className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
						variants={staggerContainer}
						initial="initial"
						whileInView="animate"
						viewport={{ once: true }}
					>
						{useCases.map((useCase) => (
							<motion.div key={useCase.title} variants={fadeInUp}>
								<Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer">
									<CardContent className="p-8">
										<div
											className={`w-16 h-16 ${useCase.color} rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
										>
											<useCase.icon className="h-8 w-8 text-white" />
										</div>
										<h3 className="text-xl font-semibold mb-3">{useCase.title}</h3>
										<p className="text-muted-foreground leading-relaxed mb-4">
											{useCase.description}
										</p>
										<div className="flex items-center text-primary font-medium group-hover:translate-x-2 transition-transform duration-300">
											Learn more <ChevronRight className="ml-1 h-4 w-4" />
										</div>
									</CardContent>
								</Card>
							</motion.div>
						))}
					</motion.div>
				</div>
			</AnimatedSection>

			{/* Pricing Section */}
			<AnimatedSection id={pricingId} className="py-24 bg-muted/30">
				<div className="container mx-auto px-4">
					<div className="text-center mb-16">
						<Badge variant="outline" className="mb-4">
							Pricing
						</Badge>
						<h2 className="text-4xl font-bold mb-6">Choose Your Plan</h2>
						<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
							Start free and scale as you grow. All plans include our core features with increasing
							limits and capabilities.
						</p>
					</div>

					<motion.div
						className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
						variants={staggerContainer}
						initial="initial"
						whileInView="animate"
						viewport={{ once: true }}
					>
						{pricingPlans.map((plan) => (
							<motion.div key={plan.name} variants={fadeInUp}>
								<Card
									className={`h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 relative ${
										plan.popular ? "ring-2 ring-primary scale-105" : ""
									}`}
								>
									{plan.popular && (
										<div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
											<Badge className="bg-primary text-primary-foreground px-4 py-1">
												Most Popular
											</Badge>
										</div>
									)}
									<CardContent className="p-8">
										<div className="text-center mb-8">
											<h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
											<div className="mb-4">
												<span className="text-4xl font-bold">{plan.price}</span>
												{plan.period && (
													<span className="text-muted-foreground">{plan.period}</span>
												)}
											</div>
											<p className="text-muted-foreground">{plan.description}</p>
										</div>

										<ul className="space-y-3 mb-8">
											{plan.features.map((feature) => (
												<li key={feature} className="flex items-center gap-3">
													<Check className="h-5 w-5 text-green-500 shrink-0" />
													<span className="text-sm">{feature}</span>
												</li>
											))}
										</ul>

										<Button
											className={`w-full ${plan.popular ? "" : "variant-outline"}`}
											variant={plan.popular ? "default" : "outline"}
										>
											{plan.cta}
										</Button>
									</CardContent>
								</Card>
							</motion.div>
						))}
					</motion.div>
				</div>
			</AnimatedSection>

			{/* Testimonials Section */}
			<AnimatedSection className="py-24 bg-background">
				<div className="container mx-auto px-4">
					<div className="text-center mb-16">
						<Badge variant="outline" className="mb-4">
							Testimonials
						</Badge>
						<h2 className="text-4xl font-bold mb-6">Loved by Professionals Worldwide</h2>
						<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
							See what our users are saying about their experience with PromptCraft.
						</p>
					</div>

					<motion.div
						className="grid md:grid-cols-3 gap-8"
						variants={staggerContainer}
						initial="initial"
						whileInView="animate"
						viewport={{ once: true }}
					>
						{testimonials.map((testimonial) => (
							<motion.div key={testimonial.name} variants={fadeInUp}>
								<Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300">
									<CardContent className="p-8">
										<div className="flex items-center gap-1 mb-4">
											{[...Array(testimonial.rating)].map((_, i) => (
												<Star
													key={`${testimonial.name}-star-${i}`}
													className="h-5 w-5 fill-yellow-400 text-yellow-400"
												/>
											))}
										</div>

										<p className="text-muted-foreground mb-6 leading-relaxed italic">
											"{testimonial.content}"
										</p>

										<div className="flex items-center gap-4">
											<img
												src={testimonial.avatar}
												alt={testimonial.name}
												className="w-12 h-12 rounded-full object-cover"
											/>
											<div>
												<p className="font-semibold">{testimonial.name}</p>
												<p className="text-sm text-muted-foreground">
													{testimonial.role} at {testimonial.company}
												</p>
											</div>
										</div>
									</CardContent>
								</Card>
							</motion.div>
						))}
					</motion.div>
				</div>
			</AnimatedSection>

			{/* Blog Section */}
			<AnimatedSection id={blogId} className="py-24 bg-muted/30">
				<div className="container mx-auto px-4">
					<div className="text-center mb-16">
						<Badge variant="outline" className="mb-4">
							Blog
						</Badge>
						<h2 className="text-4xl font-bold mb-6">Latest Insights & Updates</h2>
						<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
							Stay updated with the latest trends, tips, and best practices in AI prompt
							engineering.
						</p>
					</div>

					<motion.div
						className="grid md:grid-cols-3 gap-8"
						variants={staggerContainer}
						initial="initial"
						whileInView="animate"
						viewport={{ once: true }}
					>
						{blogPosts.map((post) => (
							<motion.div key={post.title} variants={fadeInUp}>
								<Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer">
									<div className="aspect-video overflow-hidden rounded-t-lg">
										<img
											src={post.image}
											alt={post.title}
											className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
										/>
									</div>
									<CardContent className="p-6">
										<Badge variant="secondary" className="mb-3">
											{post.category}
										</Badge>
										<h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
											{post.title}
										</h3>
										<p className="text-muted-foreground mb-4 leading-relaxed">{post.excerpt}</p>
										<div className="flex items-center justify-between text-sm text-muted-foreground">
											<span>{post.date}</span>
											<span>{post.readTime}</span>
										</div>
									</CardContent>
								</Card>
							</motion.div>
						))}
					</motion.div>

					<div className="text-center mt-12">
						<Button variant="outline" size="lg">
							View All Articles
							<ArrowRight className="ml-2 h-4 w-4" />
						</Button>
					</div>
				</div>
			</AnimatedSection>

			{/* Contact Section */}
			<AnimatedSection id={contactId} className="py-24 bg-background">
				<div className="container mx-auto px-4">
					<div className="max-w-4xl mx-auto">
						<div className="text-center mb-16">
							<Badge variant="outline" className="mb-4">
								Contact
							</Badge>
							<h2 className="text-4xl font-bold mb-6">Get in Touch</h2>
							<p className="text-xl text-muted-foreground">
								Have questions? We'd love to hear from you. Send us a message and we'll respond as
								soon as possible.
							</p>
						</div>

						<div className="grid md:grid-cols-2 gap-12">
							<div>
								<h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
								<div className="space-y-6">
									<div className="flex items-center gap-4">
										<Mail className="h-6 w-6 text-primary" />
										<div>
											<p className="font-medium">Email</p>
											<p className="text-muted-foreground">hello@promptcraft.ai</p>
										</div>
									</div>

									<div className="flex items-center gap-4">
										<MessageSquare className="h-6 w-6 text-primary" />
										<div>
											<p className="font-medium">Live Chat</p>
											<p className="text-muted-foreground">Available 24/7</p>
										</div>
									</div>

									<div className="flex items-center gap-4">
										<Globe className="h-6 w-6 text-primary" />
										<div>
											<p className="font-medium">Global Support</p>
											<p className="text-muted-foreground">Multiple languages supported</p>
										</div>
									</div>
								</div>

								<div className="mt-8">
									<h4 className="font-medium mb-4">Follow Us</h4>
									<div className="flex gap-4">
										<Button variant="outline" size="icon">
											<Twitter className="h-4 w-4" />
										</Button>
										<Button variant="outline" size="icon">
											<Linkedin className="h-4 w-4" />
										</Button>
										<Button variant="outline" size="icon">
											<Github className="h-4 w-4" />
										</Button>
									</div>
								</div>
							</div>

							<Card className="border-0 shadow-lg">
								<CardContent className="p-8">
									<form className="space-y-6">
										<div className="grid md:grid-cols-2 gap-4">
											<div>
												<label htmlFor={firstNameId} className="block text-sm font-medium mb-2">
													First Name
												</label>
												<input
													id={firstNameId}
													type="text"
													className="w-full px-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
													placeholder="John"
												/>
											</div>
											<div>
												<label htmlFor={lastNameId} className="block text-sm font-medium mb-2">
													Last Name
												</label>
												<input
													id={lastNameId}
													type="text"
													className="w-full px-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
													placeholder="Doe"
												/>
											</div>
										</div>
										<div>
											<label htmlFor={emailId} className="block text-sm font-medium mb-2">
												Email
											</label>
											<input
												id={emailId}
												type="email"
												className="w-full px-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
												placeholder="john@example.com"
											/>
										</div>
										<div>
											<label htmlFor={subjectId} className="block text-sm font-medium mb-2">
												Subject
											</label>
											<input
												id={subjectId}
												type="text"
												className="w-full px-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
												placeholder="How can we help?"
											/>
										</div>
										<div>
											<label htmlFor={messageId} className="block text-sm font-medium mb-2">
												Message
											</label>
											<textarea
												id={messageId}
												rows={5}
												className="w-full px-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
												placeholder="Tell us more about your inquiry..."
											/>
										</div>{" "}
										<Button className="w-full" size="lg">
											Send Message
											<ArrowRight className="ml-2 h-4 w-4" />
										</Button>
									</form>
								</CardContent>
							</Card>
						</div>
					</div>
				</div>
			</AnimatedSection>

			{/* CTA Section */}
			<section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
				<div className="container mx-auto px-4 text-center">
					<motion.div
						initial={{ opacity: 0, y: 40 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
					>
						<h2 className="text-4xl font-bold mb-6">Ready to Transform Your AI Prompts?</h2>
						<p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
							Join thousands of professionals who are already creating better AI prompts with
							PromptCraft.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Button size="lg" variant="secondary" className="text-lg px-8 py-6">
								Start Free Trial
								<Rocket className="ml-2 h-5 w-5" />
							</Button>
							<Button
								size="lg"
								variant="outline"
								className="text-lg px-8 py-6 border-white text-white hover:bg-white hover:text-gray-900"
							>
								Schedule Demo
							</Button>
						</div>
					</motion.div>
				</div>
			</section>

			{/* Footer */}
			<footer className="bg-gray-900 text-white py-16">
				<div className="container mx-auto px-4">
					<div className="grid md:grid-cols-4 gap-8 mb-12">
						<div>
							<div className="flex items-center gap-2 mb-6">
								<div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
									<Sparkles className="h-5 w-5 text-white" />
								</div>
								<span className="text-xl font-bold">PromptCraft</span>
							</div>
							<p className="text-gray-400 mb-6">
								Empowering everyone to create perfect AI prompts with intelligent tools and
								professional templates.
							</p>
							<div className="flex gap-4">
								<Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
									<Twitter className="h-4 w-4" />
								</Button>
								<Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
									<Linkedin className="h-4 w-4" />
								</Button>
								<Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
									<Github className="h-4 w-4" />
								</Button>
							</div>
						</div>

						<div>
							<h4 className="font-semibold mb-4">Product</h4>
							<ul className="space-y-2 text-gray-400">
								<li>
									<Link href="#" className="hover:text-white transition-colors">
										Features
									</Link>
								</li>
								<li>
									<Link href="#" className="hover:text-white transition-colors">
										Templates
									</Link>
								</li>
								<li>
									<Link href="#" className="hover:text-white transition-colors">
										Pricing
									</Link>
								</li>
								<li>
									<Link href="#" className="hover:text-white transition-colors">
										API
									</Link>
								</li>
							</ul>
						</div>

						<div>
							<h4 className="font-semibold mb-4">Resources</h4>
							<ul className="space-y-2 text-gray-400">
								<li>
									<Link href="#" className="hover:text-white transition-colors">
										Documentation
									</Link>
								</li>
								<li>
									<Link href="#" className="hover:text-white transition-colors">
										Blog
									</Link>
								</li>
								<li>
									<Link href="#" className="hover:text-white transition-colors">
										Tutorials
									</Link>
								</li>
								<li>
									<Link href="#" className="hover:text-white transition-colors">
										Community
									</Link>
								</li>
							</ul>
						</div>

						<div>
							<h4 className="font-semibold mb-4">Company</h4>
							<ul className="space-y-2 text-gray-400">
								<li>
									<Link href="#" className="hover:text-white transition-colors">
										About
									</Link>
								</li>
								<li>
									<Link href="#" className="hover:text-white transition-colors">
										Careers
									</Link>
								</li>
								<li>
									<Link href="#" className="hover:text-white transition-colors">
										Contact
									</Link>
								</li>
								<li>
									<Link href="#" className="hover:text-white transition-colors">
										Privacy
									</Link>
								</li>
							</ul>
						</div>
					</div>

					<div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
						<p className="text-gray-400 text-sm">© 2024 PromptCraft. All rights reserved.</p>
						<div className="flex gap-6 text-sm text-gray-400 mt-4 md:mt-0">
							<Link href="#" className="hover:text-white transition-colors">
								Terms of Service
							</Link>
							<Link href="#" className="hover:text-white transition-colors">
								Privacy Policy
							</Link>
							<Link href="#" className="hover:text-white transition-colors">
								Cookie Policy
							</Link>
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
}
