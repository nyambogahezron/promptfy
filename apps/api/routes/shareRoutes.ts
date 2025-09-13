import express from "express";
import {
	addCollaborator,
	addVersion,
	getPublicPrompt,
	getSharedPrompts,
	getVersionHistory,
	listPublicPrompts,
	makePromptPrivate,
	makePromptPublic,
	removeCollaborator,
	updateCollaboratorRole,
} from "../controllers/shareController";
import { authenticateUser } from "../middleware/authentication";

const router = express.Router();

router.get("/public", listPublicPrompts);
router.get("/public/:slug", getPublicPrompt);

router.use(authenticateUser);

router.post("/:id/public", makePromptPublic);
router.delete("/:id/public", makePromptPrivate);

router.get("/shared", getSharedPrompts);
router.post("/:id/collaborators", addCollaborator);
router.delete("/:id/collaborators/:userId", removeCollaborator);
router.patch("/:id/collaborators/:userId", updateCollaboratorRole);

router.post("/:id/versions", addVersion);
router.get("/:id/versions", getVersionHistory);

export default router;
