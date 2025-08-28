import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Prompt from '../models/Prompt';
import User from '../models/User';
import mongoose from 'mongoose';
import CustomError from '../errors/customError';
import crypto from 'crypto';

// Types
interface AuthRequest extends Request {
	user?: {
		userId: string;
		name: string;
		role: string;
	};
}

/**
 * Controller for sharing and collaboration features
 */

// Make a prompt public
export const makePromptPublic = async (req: AuthRequest, res: Response) => {
	const { id } = req.params;

	const prompt = await Prompt.findOne({
		_id: id,
		userId: req.user?.userId,
	});

	if (!prompt) {
		throw new CustomError({
			message: `No prompt found with id: ${id}`,
			statusCode: StatusCodes.NOT_FOUND,
		});
	}

	// Generate a unique slug if not already set
	if (!prompt.publicSlug) {
		const slug = crypto.randomBytes(8).toString('hex');
		prompt.publicSlug = slug;
	}

	prompt.isPublic = true;
	await prompt.save();

	res.status(StatusCodes.OK).json({
		prompt,
		message: 'Prompt is now public',
		shareUrl: `/prompts/public/${prompt.publicSlug}`,
	});
};

// Make a prompt private
export const makePromptPrivate = async (req: AuthRequest, res: Response) => {
	const { id } = req.params;

	const prompt = await Prompt.findOne({
		_id: id,
		userId: req.user?.userId,
	});

	if (!prompt) {
		throw new CustomError({
			message: `No prompt found with id: ${id}`,
			statusCode: StatusCodes.NOT_FOUND,
		});
	}

	prompt.isPublic = false;
	await prompt.save();

	res.status(StatusCodes.OK).json({
		prompt,
		message: 'Prompt is now private',
	});
};

// Get a public prompt by slug
export const getPublicPrompt = async (req: Request, res: Response) => {
	const { slug } = req.params;

	const prompt = await Prompt.findOne({
		publicSlug: slug,
		isPublic: true,
	}).populate('userId', 'name');

	if (!prompt) {
		throw new CustomError({
			message: 'Prompt not found or is not public',
			statusCode: StatusCodes.NOT_FOUND,
		});
	}

	res.status(StatusCodes.OK).json({ prompt });
};

// List all public prompts with pagination and filters
export const listPublicPrompts = async (req: Request, res: Response) => {
	const { category, tags, search, page = 1, limit = 10 } = req.query;

	const queryObject: any = { isPublic: true };

	// Apply filters
	if (category) {
		queryObject.category = category;
	}

	if (tags) {
		queryObject.tags = { $in: (tags as string).split(',') };
	}

	if (search) {
		queryObject.$or = [
			{ title: { $regex: search, $options: 'i' } },
			{ generatedPrompt: { $regex: search, $options: 'i' } },
		];
	}

	const skip = (Number(page) - 1) * Number(limit);

	const prompts = await Prompt.find(queryObject)
		.populate('userId', 'name')
		.sort({ createdAt: -1 })
		.skip(skip)
		.limit(Number(limit));

	const totalPrompts = await Prompt.countDocuments(queryObject);

	res.status(StatusCodes.OK).json({
		prompts,
		count: prompts.length,
		totalPages: Math.ceil(totalPrompts / Number(limit)),
		currentPage: Number(page),
	});
};

// Add collaborator to a prompt
export const addCollaborator = async (req: AuthRequest, res: Response) => {
	const { id } = req.params;
	const { email, role } = req.body;

	if (!email || !role || !['editor', 'viewer'].includes(role)) {
		throw new CustomError({
			message: 'Please provide a valid email and role (editor/viewer)',
			statusCode: StatusCodes.BAD_REQUEST,
		});
	}

	// Find prompt
	const prompt = await Prompt.findOne({
		_id: id,
		userId: req.user?.userId,
	});

	if (!prompt) {
		throw new CustomError({
			message: `No prompt found with id: ${id}`,
			statusCode: StatusCodes.NOT_FOUND,
		});
	}

	// Find user by email
	const user = await User.findOne({ email });

	if (!user) {
		throw new CustomError({
			message: `No user found with email: ${email}`,
			statusCode: StatusCodes.NOT_FOUND,
		});
	}

	// Check if user is already a collaborator
	const existingCollaborator = prompt.collaborators.find(
		(collab) => collab.userId.toString() === user._id.toString()
	);

	if (existingCollaborator) {
		throw new CustomError({
			message: 'This user is already a collaborator',
			statusCode: StatusCodes.BAD_REQUEST,
		});
	}

	// Check if user is the owner
	if (user._id.toString() === prompt.userId.toString()) {
		throw new CustomError({
			message: 'You cannot add the owner as a collaborator',
			statusCode: StatusCodes.BAD_REQUEST,
		});
	}

	// Add as collaborator
	prompt.collaborators.push({
		userId: user._id,
		role: role as 'editor' | 'viewer',
		addedAt: new Date(),
	});

	await prompt.save();

	res.status(StatusCodes.OK).json({
		message: `${user.name} has been added as a collaborator with ${role} access`,
		prompt,
	});
};

// Remove collaborator from a prompt
export const removeCollaborator = async (req: AuthRequest, res: Response) => {
	const { id, userId } = req.params;

	const prompt = await Prompt.findOne({
		_id: id,
		userId: req.user?.userId,
	});

	if (!prompt) {
		throw new CustomError({
			message: `No prompt found with id: ${id}`,
			statusCode: StatusCodes.NOT_FOUND,
		});
	}

	// Find collaborator index
	const collaboratorIndex = prompt.collaborators.findIndex(
		(collab) => collab.userId.toString() === userId
	);

	if (collaboratorIndex === -1) {
		throw new CustomError({
			message: 'Collaborator not found',
			statusCode: StatusCodes.NOT_FOUND,
		});
	}

	// Remove collaborator
	prompt.collaborators.splice(collaboratorIndex, 1);
	await prompt.save();

	res.status(StatusCodes.OK).json({
		message: 'Collaborator removed successfully',
		prompt,
	});
};

// Update collaborator role
export const updateCollaboratorRole = async (
	req: AuthRequest,
	res: Response
) => {
	const { id, userId } = req.params;
	const { role } = req.body;

	if (!role || !['editor', 'viewer'].includes(role)) {
		throw new CustomError({
			message: 'Please provide a valid role (editor/viewer)',
			statusCode: StatusCodes.BAD_REQUEST,
		});
	}

	const prompt = await Prompt.findOne({
		_id: id,
		userId: req.user?.userId,
	});

	if (!prompt) {
		throw new CustomError({
			message: `No prompt found with id: ${id}`,
			statusCode: StatusCodes.NOT_FOUND,
		});
	}

	// Find collaborator
	const collaborator = prompt.collaborators.find(
		(collab) => collab.userId.toString() === userId
	);

	if (!collaborator) {
		throw new CustomError({
			message: 'Collaborator not found',
			statusCode: StatusCodes.NOT_FOUND,
		});
	}

	// Update role
	collaborator.role = role as 'editor' | 'viewer';
	await prompt.save();

	res.status(StatusCodes.OK).json({
		message: `Collaborator role updated to ${role}`,
		prompt,
	});
};

// Get prompts shared with user
export const getSharedPrompts = async (req: AuthRequest, res: Response) => {
	const prompts = await Prompt.find({
		'collaborators.userId': req.user?.userId,
	})
		.populate('userId', 'name email')
		.sort({ updatedAt: -1 });

	res.status(StatusCodes.OK).json({
		prompts,
		count: prompts.length,
	});
};

// Add a new version to version history
export const addVersion = async (req: AuthRequest, res: Response) => {
	const { id } = req.params;
	const { prompt, notes } = req.body;

	if (!prompt) {
		throw new CustomError({
			message: 'Please provide the prompt content for versioning',
			statusCode: StatusCodes.BAD_REQUEST,
		});
	}

	// Find prompt document
	const promptDoc = await Prompt.findOne({
		_id: id,
		$or: [
			{ userId: req.user?.userId },
			{
				collaborators: {
					$elemMatch: {
						userId: req.user?.userId,
						role: 'editor',
					},
				},
			},
		],
	});

	if (!promptDoc) {
		throw new CustomError({
			message: `No prompt found with id: ${id} or you don't have edit permissions`,
			statusCode: StatusCodes.NOT_FOUND,
		});
	}

	// Get next version number
	const latestVersion =
		promptDoc.versionHistory.length > 0
			? Math.max(...promptDoc.versionHistory.map((v) => v.version))
			: 0;

	const newVersion = latestVersion + 1;

	// Add version to history
	promptDoc.versionHistory.push({
		version: newVersion,
		prompt,
		updatedBy: new mongoose.Types.ObjectId(req.user?.userId),
		updatedAt: new Date(),
		notes,
	});

	// Update current prompt if requested
	if (req.body.updateCurrent) {
		promptDoc.generatedPrompt = prompt;
	}

	await promptDoc.save();

	res.status(StatusCodes.OK).json({
		message: `Version ${newVersion} added successfully`,
		version: newVersion,
		prompt: promptDoc,
	});
};

// Get version history
export const getVersionHistory = async (req: AuthRequest, res: Response) => {
	const { id } = req.params;

	const prompt = await Prompt.findOne({
		_id: id,
		$or: [
			{ userId: req.user?.userId },
			{ 'collaborators.userId': req.user?.userId },
		],
	}).populate('versionHistory.updatedBy', 'name email');

	if (!prompt) {
		throw new CustomError({
			message: `No prompt found with id: ${id} or you don't have access`,
			statusCode: StatusCodes.NOT_FOUND,
		});
	}

	res.status(StatusCodes.OK).json({
		versionHistory: prompt.versionHistory,
		count: prompt.versionHistory.length,
	});
};
