import mongoose, { Document } from 'mongoose';

export interface ICollaborator {
	userId: mongoose.Schema.Types.ObjectId;
	role: 'editor' | 'viewer';
	addedAt: Date;
}

export interface IPrompt extends Document {
	title: string;
	content: string;
	userInstructions: string;
	generatedPrompt: string;
	category: string;
	tags: string[];
	userId: mongoose.Schema.Types.ObjectId;
	isPublic: boolean;
	publicSlug?: string;
	collaborators: ICollaborator[];
	versionHistory: {
		version: number;
		prompt: string;
		updatedBy: mongoose.Schema.Types.ObjectId;
		updatedAt: Date;
		notes?: string;
	}[];
	createdAt: Date;
	updatedAt: Date;
}

const PromptSchema = new mongoose.Schema<IPrompt>(
	{
		title: {
			type: String,
			required: [true, 'Please provide a title'],
			trim: true,
			maxlength: [100, 'Title cannot be more than 100 characters'],
		},
		content: {
			type: String,
			required: [true, 'Please provide prompt content'],
			trim: true,
		},
		userInstructions: {
			type: String,
			required: [true, 'Please provide user instructions'],
			trim: true,
		},
		generatedPrompt: {
			type: String,
			required: true,
		},
		category: {
			type: String,
			required: [true, 'Please provide a category'],
			enum: [
				'Writing',
				'Academic',
				'Programming',
				'Business',
				'Creative',
				'Marketing',
				'Professional',
				'Personal',
				'Other',
			],
		},
		tags: {
			type: [String],
			default: [],
		},
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		isPublic: {
			type: Boolean,
			default: false,
		},
		publicSlug: {
			type: String,
			unique: true,
			sparse: true, // Only enforces uniqueness if the field exists
		},
		collaborators: [
			{
				userId: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'User',
					required: true,
				},
				role: {
					type: String,
					enum: ['editor', 'viewer'],
					default: 'viewer',
				},
				addedAt: {
					type: Date,
					default: Date.now,
				},
			},
		],
		versionHistory: [
			{
				version: {
					type: Number,
					required: true,
				},
				prompt: {
					type: String,
					required: true,
				},
				updatedBy: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'User',
					required: true,
				},
				updatedAt: {
					type: Date,
					default: Date.now,
				},
				notes: {
					type: String,
				},
			},
		],
	},
	{ timestamps: true }
);

export default mongoose.model<IPrompt>('Prompt', PromptSchema);
