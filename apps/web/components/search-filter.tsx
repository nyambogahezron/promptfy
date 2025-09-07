"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Filter, Heart, Search, Star, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { categories } from "@/lib/templates";

interface SearchFilterProps {
	searchQuery: string;
	onSearchChange: (query: string) => void;
	selectedCategory: string;
	onCategoryChange: (category: string) => void;
	selectedTags: string[];
	onTagToggle: (tag: string) => void;
	availableTags: string[];
	showFavoritesOnly: boolean;
	onToggleFavorites: () => void;
	sortBy: "recent" | "oldest" | "title" | "score";
	onSortChange: (sort: "recent" | "oldest" | "title" | "score") => void;
}

export function SearchFilter({
	searchQuery,
	onSearchChange,
	selectedCategory,
	onCategoryChange,
	selectedTags,
	onTagToggle,
	availableTags,
	showFavoritesOnly,
	onToggleFavorites,
	sortBy,
	onSortChange,
}: SearchFilterProps) {
	const hasActiveFilters =
		selectedCategory !== "all" || selectedTags.length > 0 || showFavoritesOnly;

	const clearAllFilters = () => {
		onCategoryChange("all");
		selectedTags.forEach((tag) => {
			onTagToggle(tag);
		});
		if (showFavoritesOnly) onToggleFavorites();
	};

	return (
		<div className="space-y-4">
			<div className="flex flex-col sm:flex-row gap-4">
				<div className="flex-1 relative">
					<Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
					<Input
						value={searchQuery}
						onChange={(e) => onSearchChange(e.target.value)}
						placeholder="Search prompts..."
						className="pl-10 transition-all duration-200 focus:ring-2"
					/>
				</div>

				<div className="flex gap-2">
					<Select value={selectedCategory} onValueChange={onCategoryChange}>
						<SelectTrigger className="w-[150px]">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All Categories</SelectItem>
							{categories.map((category) => (
								<SelectItem key={category.id} value={category.id}>
									<div className="flex items-center gap-2">
										<div className={`w-3 h-3 rounded-full ${category.color}`} />
										{category.name}
									</div>
								</SelectItem>
							))}
						</SelectContent>
					</Select>

					<Select value={sortBy} onValueChange={onSortChange}>
						<SelectTrigger className="w-[130px]">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="recent">Most Recent</SelectItem>
							<SelectItem value="oldest">Oldest First</SelectItem>
							<SelectItem value="title">Alphabetical</SelectItem>
							<SelectItem value="score">
								<div className="flex items-center gap-1">
									<Star className="h-3 w-3" />
									Score
								</div>
							</SelectItem>
						</SelectContent>
					</Select>

					<Button
						variant={showFavoritesOnly ? "default" : "outline"}
						size="icon"
						onClick={onToggleFavorites}
						className="transition-all duration-200"
						title="Show favorites only"
					>
						<Heart className="h-4 w-4" fill={showFavoritesOnly ? "currentColor" : "none"} />
					</Button>
				</div>
			</div>

			<AnimatePresence>
				{availableTags.length > 0 && (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: "auto" }}
						exit={{ opacity: 0, height: 0 }}
						transition={{ duration: 0.2 }}
						className="space-y-2"
					>
						<div className="flex items-center gap-2">
							<Filter className="h-4 w-4 text-muted-foreground" />
							<span className="text-sm font-medium">Filter by tags:</span>
							{hasActiveFilters && (
								<Button
									variant="ghost"
									size="sm"
									onClick={clearAllFilters}
									className="text-xs h-6 px-2"
								>
									Clear all
								</Button>
							)}
						</div>

						<div className="flex flex-wrap gap-2">
							{availableTags.map((tag) => {
								const isSelected = selectedTags.includes(tag);
								return (
									<Badge
										key={tag}
										variant={isSelected ? "default" : "outline"}
										className="cursor-pointer transition-all duration-200 hover:scale-105"
										onClick={() => onTagToggle(tag)}
									>
										{tag}
										{isSelected && <X className="h-3 w-3 ml-1" />}
									</Badge>
								);
							})}
						</div>
					</motion.div>
				)}
			</AnimatePresence>

			{hasActiveFilters && (
				<motion.div
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
					className="text-xs text-muted-foreground"
				>
					Active filters:{" "}
					{selectedCategory !== "all" && categories.find((c) => c.id === selectedCategory)?.name}
					{selectedCategory !== "all" && selectedTags.length > 0 && ", "}
					{selectedTags.length > 0 &&
						`${selectedTags.length} tag${selectedTags.length > 1 ? "s" : ""}`}
					{showFavoritesOnly && (selectedCategory !== "all" || selectedTags.length > 0) && ", "}
					{showFavoritesOnly && "Favorites only"}
				</motion.div>
			)}
		</div>
	);
}
