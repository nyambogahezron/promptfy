"use client";

import { Code, Download, FileDown, FileText } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { exportPrompts } from "@/lib/storage";

interface ExportDialogProps {
	isOpen: boolean;
	onClose: () => void;
	promptCount: number;
}

export function ExportDialog({ isOpen, onClose, promptCount }: ExportDialogProps) {
	const [exportFormat, setExportFormat] = useState<"json" | "txt" | "md">("json");
	const [isExporting, setIsExporting] = useState(false);

	const formats = [
		{
			value: "json",
			label: "JSON",
			description: "Structured data format, perfect for importing",
			icon: Code,
			extension: ".json",
		},
		{
			value: "txt",
			label: "Text File",
			description: "Plain text format, easy to read and share",
			icon: FileText,
			extension: ".txt",
		},
		{
			value: "md",
			label: "Markdown",
			description: "Formatted text with headings and structure",
			icon: FileDown,
			extension: ".md",
		},
	] as const;

	const handleExport = async () => {
		setIsExporting(true);

		try {
			const exportData = exportPrompts(exportFormat);
			const blob = new Blob([exportData], {
				type: exportFormat === "json" ? "application/json" : "text/plain",
			});

			const url = URL.createObjectURL(blob);
			const a = document.createElement("a");
			a.href = url;
			a.download = `ai-prompts-${new Date().toISOString().split("T")[0]}${formats.find((f) => f.value === exportFormat)?.extension}`;
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
			URL.revokeObjectURL(url);

			toast.success(
				`Successfully exported ${promptCount} prompts as ${exportFormat.toUpperCase()}`
			);
			onClose();
		} catch (_error) {
			toast.error("Failed to export prompts");
		} finally {
			setIsExporting(false);
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle className="flex items-center gap-2">
						<Download className="h-5 w-5" />
						Export Prompts
					</DialogTitle>
					<DialogDescription>
						Export all {promptCount} prompts in your preferred format.
					</DialogDescription>
				</DialogHeader>

				<div className="space-y-6">
					<RadioGroup
						value={exportFormat}
						onValueChange={(value) => setExportFormat(value as typeof exportFormat)}
						className="space-y-3"
					>
						{formats.map((format) => (
							<div key={format.value} className="flex items-start space-x-3">
								<RadioGroupItem value={format.value} id={format.value} className="mt-1" />
								<div className="flex-1 space-y-1">
									<Label htmlFor={format.value} className="flex items-center gap-2 cursor-pointer">
										<format.icon className="h-4 w-4" />
										{format.label}
										<Badge variant="outline" className="text-xs">
											{format.extension}
										</Badge>
									</Label>
									<p className="text-sm text-muted-foreground">{format.description}</p>
								</div>
							</div>
						))}
					</RadioGroup>

					<div className="flex justify-between items-center pt-4 border-t">
						<div className="text-sm text-muted-foreground">
							Ready to export {promptCount} prompt{promptCount !== 1 ? "s" : ""}
						</div>
						<div className="flex gap-2">
							<Button variant="outline" onClick={onClose}>
								Cancel
							</Button>
							<Button onClick={handleExport} disabled={isExporting}>
								{isExporting ? (
									<>
										<Download className="h-4 w-4 mr-2 animate-pulse" />
										Exporting...
									</>
								) : (
									<>
										<Download className="h-4 w-4 mr-2" />
										Export
									</>
								)}
							</Button>
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
