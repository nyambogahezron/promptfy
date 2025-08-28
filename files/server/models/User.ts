import mongoose, { Document } from 'mongoose';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

export interface IUser extends Document {
	name: string;
	email: string;
	password: string;
	role: 'user' | 'admin';
	verificationToken?: string;
	isVerified: boolean;
	verified?: Date;
	passwordToken?: string;
	passwordTokenExpirationDate?: Date;
	comparePassword(candidatePassword: string): Promise<boolean>;
	createPasswordResetToken(): string;
}

const UserSchema = new mongoose.Schema<IUser>(
	{
		name: {
			type: String,
			required: [true, 'Please provide a name'],
			minlength: 3,
			maxlength: 50,
		},
		email: {
			type: String,
			required: [true, 'Please provide an email'],
			unique: true,
			match: [
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
				'Please provide a valid email',
			],
		},
		password: {
			type: String,
			required: [true, 'Please provide a password'],
			minlength: 6,
		},
		role: {
			type: String,
			enum: ['user', 'admin'],
			default: 'user',
		},
		verificationToken: String,
		isVerified: {
			type: Boolean,
			default: false,
		},
		verified: Date,
		passwordToken: String,
		passwordTokenExpirationDate: Date,
	},
	{ timestamps: true }
);

// Hash password before saving
UserSchema.pre('save', async function () {
	if (!this.isModified('password')) return;
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

// Compare password method
UserSchema.methods.comparePassword = async function (
	candidatePassword: string
): Promise<boolean> {
	return await bcrypt.compare(candidatePassword, this.password);
};

// Create password reset token
UserSchema.methods.createPasswordResetToken = function (): string {
	// Generate a random token
	const resetToken = crypto.randomBytes(32).toString('hex');

	// Hash token and set to passwordToken field
	this.passwordToken = crypto
		.createHash('sha256')
		.update(resetToken)
		.digest('hex');

	// Set expiration (10 minutes)
	this.passwordTokenExpirationDate = new Date(Date.now() + 10 * 60 * 1000);

	return resetToken;
};

export default mongoose.model<IUser>('User', UserSchema);
