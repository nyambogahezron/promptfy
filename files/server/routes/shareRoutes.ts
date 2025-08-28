import express from 'express';
import {
	makePromptPublic,
	makePromptPrivate,
	getPublicPrompt,
	listPublicPrompts,
	addCollaborator,
	removeCollaborator,
	updateCollaboratorRole,
	getSharedPrompts,
	addVersion,
	getVersionHistory,
} from '../controllers/shareController';
import { authenticateUser } from '../middleware/authentication';

const router = express.Router();

// Public prompt routes
router.get('/public', listPublicPrompts);
router.get('/public/:slug', getPublicPrompt);

// Authentication required for these routes
router.use(authenticateUser);

// Sharing routes
router.post('/:id/public', makePromptPublic);
router.delete('/:id/public', makePromptPrivate);

// Collaboration routes
router.get('/shared', getSharedPrompts);
router.post('/:id/collaborators', addCollaborator);
router.delete('/:id/collaborators/:userId', removeCollaborator);
router.patch('/:id/collaborators/:userId', updateCollaboratorRole);

// Versioning routes
router.post('/:id/versions', addVersion);
router.get('/:id/versions', getVersionHistory);

export default router;
