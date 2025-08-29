import mongoose, { Document } from 'mongoose';

// Define interfaces for analytics
export interface IPromptView {
	timestamp: Date;
	userId?: mongoose.Schema.Types.ObjectId;
	isAnonymous: boolean;
}

export interface IPromptUsage {
	copiedCount: number;
	viewCount: number;
	views: IPromptView[];
	lastViewed?: Date;
}

export interface IAnalytics extends Document {
	promptId: mongoose.Schema.Types.ObjectId;
	usage: IPromptUsage;
	createdAt: Date;
	updatedAt: Date;
}

const AnalyticsSchema = new mongoose.Schema<IAnalytics>(
	{
		promptId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Prompt',
			required: true,
			unique: true,
		},
		usage: {
			copiedCount: {
				type: Number,
				default: 0,
			},
			viewCount: {
				type: Number,
				default: 0,
			},
			views: [
				{
					timestamp: {
						type: Date,
						default: Date.now,
					},
					userId: {
						type: mongoose.Schema.Types.ObjectId,
						ref: 'User',
					},
					isAnonymous: {
						type: Boolean,
						default: false,
					},
				},
			],
			lastViewed: {
				type: Date,
			},
		},
	},
	{ timestamps: true }
);

export default mongoose.model<IAnalytics>('Analytics', AnalyticsSchema);
