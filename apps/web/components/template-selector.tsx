"use client";

import { motion } from "framer-motion";
import { FileText, Lightbulb } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { categories, promptTemplates } from "@/lib/templates";
import type { PromptTemplate } from "@/types/prompt";

interface TemplateSelectorProps {
	onSelectTemplate: (template: PromptTemplate) => void;
	onClose: () => void;
}

export function TemplateSelector({ onSelectTemplate, onClose }: TemplateSelectorProps) {
	const handleSelectTemplate = (template: PromptTemplate) => {
		onSelectTemplate(template);
		onClose();
	};

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className="space-y-6"
		>
			<div className="flex items-center justify-between">
				<div className="space-y-1">
					<h2 className="text-2xl font-semibold tracking-tight">Prompt Templates</h2>
					<p className="text-sm text-muted-foreground">
						Choose from professionally crafted templates to get started quickly
					</p>
				</div>
				<Button variant="outline" onClick={onClose}>
					Cancel
				</Button>
			</div>

			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				{promptTemplates.map((template) => {
					const category = categories.find((c) => c.id === template.category);

					return (
						<motion.div
							key={template.id}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: parseInt(template.id, 10) * 0.1 }}
							whileHover={{ y: -4 }}
						>
							<Card className="h-full flex flex-col cursor-pointer group hover:shadow-md transition-all duration-200">
								<CardHeader className="pb-3">
									<div className="flex items-start justify-between gap-2">
										<div className="flex items-center gap-2">
											<FileText className="h-5 w-5 text-primary" />
											<CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors duration-200">
												{template.title}
											</CardTitle>
										</div>
										{category && (
											<Badge variant="outline" className="shrink-0">
												<div className={`w-2 h-2 rounded-full ${category.color} mr-1`} />
												{category.name}
											</Badge>
										)}
									</div>
								</CardHeader>

								<CardContent className="flex-1 flex flex-col gap-4">
									<p className="text-sm text-muted-foreground flex-1">{template.description}</p>

									<div className="space-y-3">
										<div className="bg-muted p-3 rounded-lg">
											<p className="text-xs font-mono line-clamp-3">{template.content}</p>
										</div>

										{template.tags.length > 0 && (
											<div className="flex flex-wrap gap-1">
												{template.tags.slice(0, 3).map((tag) => (
													<Badge key={tag} variant="secondary" className="text-xs">
														{tag}
													</Badge>
												))}
												{template.tags.length > 3 && (
													<Badge variant="outline" className="text-xs">
														+{template.tags.length - 3}
													</Badge>
												)}
											</div>
										)}

										<Button
											onClick={() => handleSelectTemplate(template)}
											className="w-full transition-all duration-200"
										>
											<Lightbulb className="h-4 w-4 mr-2" />
											Use Template
										</Button>
									</div>
								</CardContent>
							</Card>
						</motion.div>
					);
				})}
			</div>
		</motion.div>
	);
}
