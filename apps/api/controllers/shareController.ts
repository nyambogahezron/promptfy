import crypto from "crypto";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import CustomError from "../errors/customError";
import Prompt from "../models/Prompt";
import User from "../models/User";

interface AuthRequest extends Request {
	user?: {
		id: string;
		name: string;
		email: string;
		role: string;
		emailVerified: boolean;
	};
}

export const makePromptPublic = async (req: AuthRequest, res: Response) => {
	const { id } = req.params;

	const prompt = await Prompt.findOne({
		_id: id,
		id: req.user?.id,
	});

	if (!prompt) {
		throw new CustomError({
			message: `No prompt found with id: ${id}`,
			statusCode: StatusCodes.NOT_FOUND,
		});
	}

	if (!prompt.publicSlug) {
		const slug = crypto.randomBytes(8).toString("hex");
		prompt.publicSlug = slug;
	}

	prompt.isPublic = true;
	await prompt.save();

	res.status(StatusCodes.OK).json({
		prompt,
		message: "Prompt is now public",
		shareUrl: `/prompts/public/${prompt.publicSlug}`,
	});
};

export const makePromptPrivate = async (req: AuthRequest, res: Response) => {
	const { id } = req.params;

	const prompt = await Prompt.findOne({
		_id: id,
		id: req.user?.id,
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
		message: "Prompt is now private",
	});
};

export const getPublicPrompt = async (req: Request, res: Response) => {
	const { slug } = req.params;

	const prompt = await Prompt.findOne({
		publicSlug: slug,
		isPublic: true,
	}).populate("id", "name");

	if (!prompt) {
		throw new CustomError({
			message: "Prompt not found or is not public",
			statusCode: StatusCodes.NOT_FOUND,
		});
	}

	res.status(StatusCodes.OK).json({ prompt });
};

export const listPublicPrompts = async (req: Request, res: Response) => {
	const { category, tags, search, page = 1, limit = 10 } = req.query;

	const queryObject: Record<string, unknown> = { isPublic: true };

	if (category) {
		queryObject.category = category;
	}

	if (tags) {
		queryObject.tags = { $in: (tags as string).split(",") };
	}

	if (search) {
		queryObject.$or = [
			{ title: { $regex: search, $options: "i" } },
			{ generatedPrompt: { $regex: search, $options: "i" } },
		];
	}

	const skip = (Number(page) - 1) * Number(limit);

	const prompts = await Prompt.find(queryObject)
		.populate("id", "name")
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

export const addCollaborator = async (req: AuthRequest, res: Response) => {
	const { id } = req.params;
	const { email, role } = req.body;

	if (!email || !role || !["editor", "viewer"].includes(role)) {
		throw new CustomError({
			message: "Please provide a valid email and role (editor/viewer)",
			statusCode: StatusCodes.BAD_REQUEST,
		});
	}

	const prompt = await Prompt.findOne({
		_id: id,
		id: req.user?.id,
	});

	if (!prompt) {
		throw new CustomError({
			message: `No prompt found with id: ${id}`,
			statusCode: StatusCodes.NOT_FOUND,
		});
	}

	const user = await User.findOne({ email });

	if (!user) {
		throw new CustomError({
			message: `No user found with email: ${email}`,
			statusCode: StatusCodes.NOT_FOUND,
		});
	}

	const existingCollaborator = prompt.collaborators.find(
		(collab) => collab.userId.toString() === (user._id as mongoose.Types.ObjectId).toString()
	);

	if (existingCollaborator) {
		throw new CustomError({
			message: "This user is already a collaborator",
			statusCode: StatusCodes.BAD_REQUEST,
		});
	}

	if ((user._id as mongoose.Types.ObjectId).toString() === prompt.userId.toString()) {
		throw new CustomError({
			message: "You cannot add the owner as a collaborator",
			statusCode: StatusCodes.BAD_REQUEST,
		});
	}

	prompt.collaborators.push({
		userId: user._id as mongoose.Schema.Types.ObjectId,
		role: role as "editor" | "viewer",
		addedAt: new Date(),
	});

	await prompt.save();

	res.status(StatusCodes.OK).json({
		message: `${user.name} has been added as a collaborator with ${role} access`,
		prompt,
	});
};

export const removeCollaborator = async (req: AuthRequest, res: Response) => {
	const { id } = req.params;

	const prompt = await Prompt.findOne({
		_id: id,
		id: req.user?.id,
	});

	if (!prompt) {
		throw new CustomError({
			message: `No prompt found with id: ${id}`,
			statusCode: StatusCodes.NOT_FOUND,
		});
	}

	const collaboratorIndex = prompt.collaborators.findIndex(
		(collab) => collab.userId.toString() === id
	);

	if (collaboratorIndex === -1) {
		throw new CustomError({
			message: "Collaborator not found",
			statusCode: StatusCodes.NOT_FOUND,
		});
	}

	prompt.collaborators.splice(collaboratorIndex, 1);
	await prompt.save();

	res.status(StatusCodes.OK).json({
		message: "Collaborator removed successfully",
		prompt,
	});
};

export const updateCollaboratorRole = async (req: AuthRequest, res: Response) => {
	const { id } = req.params;
	const { role } = req.body;

	if (!role || !["editor", "viewer"].includes(role)) {
		throw new CustomError({
			message: "Please provide a valid role (editor/viewer)",
			statusCode: StatusCodes.BAD_REQUEST,
		});
	}

	const prompt = await Prompt.findOne({
		_id: id,
		id: req.user?.id,
	});

	if (!prompt) {
		throw new CustomError({
			message: `No prompt found with id: ${id}`,
			statusCode: StatusCodes.NOT_FOUND,
		});
	}

	const collaborator = prompt.collaborators.find((collab) => collab.userId.toString() === id);

	if (!collaborator) {
		throw new CustomError({
			message: "Collaborator not found",
			statusCode: StatusCodes.NOT_FOUND,
		});
	}

	collaborator.role = role as "editor" | "viewer";
	await prompt.save();

	res.status(StatusCodes.OK).json({
		message: `Collaborator role updated to ${role}`,
		prompt,
	});
};

export const getSharedPrompts = async (req: AuthRequest, res: Response) => {
	const prompts = await Prompt.find({
		"collaborators.userId": req.user?.id,
	})
		.populate("id", "name email")
		.sort({ updatedAt: -1 });

	res.status(StatusCodes.OK).json({
		prompts,
		count: prompts.length,
	});
};

export const addVersion = async (req: AuthRequest, res: Response) => {
	const { id } = req.params;
	const { prompt, notes } = req.body;

	if (!prompt) {
		throw new CustomError({
			message: "Please provide the prompt content for versioning",
			statusCode: StatusCodes.BAD_REQUEST,
		});
	}

	const promptDoc = await Prompt.findOne({
		_id: id,
		$or: [
			{ userId: req.user?.id },
			{
				collaborators: {
					$elemMatch: {
						id: req.user?.id,
						role: "editor",
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

	const latestVersion =
		promptDoc.versionHistory.length > 0
			? Math.max(...promptDoc.versionHistory.map((v) => v.version))
			: 0;

	const newVersion = latestVersion + 1;

	promptDoc.versionHistory.push({
		version: newVersion,
		prompt,
		updatedBy: new mongoose.Types.ObjectId(
			String(req.user?.id)
		) as unknown as mongoose.Schema.Types.ObjectId,
		updatedAt: new Date(),
		notes,
	});

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

export const getVersionHistory = async (req: AuthRequest, res: Response) => {
	const { id } = req.params;

	const prompt = await Prompt.findOne({
		_id: id,
		$or: [{ userId: req.user?.id }, { "collaborators.userId": req.user?.id }],
	}).populate("versionHistory.updatedBy", "name email");

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
