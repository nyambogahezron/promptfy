import mongoose, { Document } from 'mongoose';

export interface IPromptTemplate extends Document {
	name: string;
	description: string;
	template: string;
	category: string;
	isDefault: boolean;
	createdBy?: mongoose.Schema.Types.ObjectId;
	createdAt: Date;
	updatedAt: Date;
}

const PromptTemplateSchema = new mongoose.Schema<IPromptTemplate>(
	{
		name: {
			type: String,
			required: [true, 'Please provide a name'],
			trim: true,
			maxlength: [50, 'Name cannot be more than 50 characters'],
		},
		description: {
			type: String,
			required: [true, 'Please provide a description'],
			trim: true,
			maxlength: [500, 'Description cannot be more than 500 characters'],
		},
		template: {
			type: String,
			required: [true, 'Please provide a template'],
			trim: true,
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
		isDefault: {
			type: Boolean,
			default: false,
		},
		createdBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
	},
	{ timestamps: true }
);

export default mongoose.model<IPromptTemplate>(
	'PromptTemplate',
	PromptTemplateSchema
);
