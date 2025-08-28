import { Request, Response } from 'express';
import User from '../models/User';
import { StatusCodes } from 'http-status-codes';
import CustomError from '../errors/customError';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import {
	sendResetPasswordEmail,
	sendVerificationEmail,
} from '../services/emailService';

// Types
interface AuthRequest extends Request {
	user?: {
		userId: string;
		name: string;
		role: string;
	};
}

// Helper function to create JWT token
const createJWT = (user: any) => {
	return jwt.sign(
		{ userId: user._id, name: user.name, role: user.role },
		process.env.JWT_SECRET as jwt.Secret,
		{ expiresIn: process.env.JWT_LIFETIME || '1d' }
	);
};

// Register user
export const register = async (req: Request, res: Response) => {
	const { name, email, password } = req.body;

	// First registered user is an admin
	const isFirstAccount = (await User.countDocuments({})) === 0;
	const role = isFirstAccount ? 'admin' : 'user';

	// Create verification token
	const verificationToken = crypto.randomBytes(40).toString('hex');

	// Create user
	const user = await User.create({
		name,
		email,
		password,
		role,
		verificationToken,
	});

	// Send verification email
	await sendVerificationEmail({
		name: user.name,
		email: user.email,
		verificationToken: user.verificationToken!,
	});

	res.status(StatusCodes.CREATED).json({
		msg: 'Success! Please check your email to verify account',
	});
};

// Verify user email
export const verifyEmail = async (req: Request, res: Response) => {
	const { verificationToken, email } = req.body;

	const user = await User.findOne({ email });

	if (!user) {
		throw new CustomError({
			message: 'Verification failed',
			statusCode: StatusCodes.UNAUTHORIZED,
		});
	}

	if (user.verificationToken !== verificationToken) {
		throw new CustomError({
			message: 'Verification failed',
			statusCode: StatusCodes.UNAUTHORIZED,
		});
	}

	user.isVerified = true;
	user.verified = new Date();
	user.verificationToken = undefined;

	await user.save();

	res.status(StatusCodes.OK).json({ msg: 'Email verified' });
};

// Login user
export const login = async (req: Request, res: Response) => {
	const { email, password } = req.body;

	if (!email || !password) {
		throw new CustomError({
			message: 'Please provide email and password',
			statusCode: StatusCodes.BAD_REQUEST,
		});
	}

	const user = await User.findOne({ email });

	if (!user) {
		throw new CustomError({
			message: 'Invalid credentials',
			statusCode: StatusCodes.UNAUTHORIZED,
		});
	}

	const isPasswordCorrect = await user.comparePassword(password);
	if (!isPasswordCorrect) {
		throw new CustomError({
			message: 'Invalid credentials',
			statusCode: StatusCodes.UNAUTHORIZED,
		});
	}

	if (!user.isVerified) {
		throw new CustomError({
			message: 'Please verify your email',
			statusCode: StatusCodes.UNAUTHORIZED,
		});
	}

	const token = createJWT(user);

	res.status(StatusCodes.OK).json({
		user: {
			name: user.name,
			email: user.email,
			role: user.role,
		},
		token,
	});
};

// Forgot password
export const forgotPassword = async (req: Request, res: Response) => {
	const { email } = req.body;

	if (!email) {
		throw new CustomError({
			message: 'Please provide valid email',
			statusCode: StatusCodes.BAD_REQUEST,
		});
	}

	const user = await User.findOne({ email });

	if (user) {
		// Generate reset token
		const resetToken = user.createPasswordResetToken();
		await user.save();

		// Send reset password email
		await sendResetPasswordEmail({
			name: user.name,
			email: user.email,
			token: resetToken,
		});
	}

	// Always return same message for security
	res.status(StatusCodes.OK).json({
		msg: 'Please check your email for reset password link',
	});
};

// Reset password
export const resetPassword = async (req: Request, res: Response) => {
	const { token, email, password } = req.body;

	if (!token || !email || !password) {
		throw new CustomError({
			message: 'Please provide all values',
			statusCode: StatusCodes.BAD_REQUEST,
		});
	}

	const user = await User.findOne({ email });

	if (!user) {
		throw new CustomError({
			message: 'Invalid credentials',
			statusCode: StatusCodes.BAD_REQUEST,
		});
	}

	// Hash token for comparison
	const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

	// Check if token exists and is not expired
	if (
		user.passwordToken !== hashedToken ||
		!user.passwordTokenExpirationDate ||
		user.passwordTokenExpirationDate < new Date()
	) {
		throw new CustomError({
			message: 'Invalid or expired token',
			statusCode: StatusCodes.BAD_REQUEST,
		});
	}

	// Reset password
	user.password = password;
	user.passwordToken = undefined;
	user.passwordTokenExpirationDate = undefined;
	await user.save();

	res.status(StatusCodes.OK).json({ msg: 'Password reset successful' });
};

// Get current user (for testing authentication)
export const getCurrentUser = async (req: AuthRequest, res: Response) => {
	const userId = req.user?.userId;

	const user = await User.findById(userId).select('-password');

	if (!user) {
		throw new CustomError({
			message: 'User not found',
			statusCode: StatusCodes.NOT_FOUND,
		});
	}

	res.status(StatusCodes.OK).json({ user });
};
