import express from "express";
import {
	analyzePrompt,
	createTemplate,
	deletePrompt,
	deleteTemplate,
	enhancePrompt,
	generatePrompt,
	getAllTemplates,
	getPromptById,
	getTemplateById,
	getUserPrompts,
	updatePrompt,
	updateTemplate,
} from "../controllers/promptController";
import { authenticateUser } from "../middleware/authentication";

const router = express.Router();

// Template routes
router.get("/templates", authenticateUser, getAllTemplates);
router.get("/templates/:id", authenticateUser, getTemplateById);
router.post("/templates", authenticateUser, createTemplate);
router.patch("/templates/:id", authenticateUser, updateTemplate);
router.delete("/templates/:id", authenticateUser, deleteTemplate);

// Prompt generation routes
router.post("/generate", authenticateUser, generatePrompt);
router.get("/user", authenticateUser, getUserPrompts);
router.get("/:id", authenticateUser, getPromptById);
router.patch("/:id", authenticateUser, updatePrompt);
router.post("/:id/enhance", authenticateUser, enhancePrompt);
router.get("/:id/analyze", authenticateUser, analyzePrompt);
router.delete("/:id", authenticateUser, deletePrompt);

export default router;
