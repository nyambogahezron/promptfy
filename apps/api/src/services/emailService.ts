import nodemailer from 'nodemailer';

interface EmailOptions {
	name: string;
	email: string;
}

interface VerificationEmailOptions extends EmailOptions {
	verificationToken: string;
}

interface ResetPasswordEmailOptions extends EmailOptions {
	token: string;
}

export const sendVerificationEmail = async ({
	name,
	email,
	verificationToken,
}: VerificationEmailOptions) => {
	// Create transporter
	const transporter = nodemailer.createTransport({
		host: process.env.EMAIL_HOST,
		port: Number(process.env.EMAIL_PORT) || 587,
		auth: {
			user: process.env.EMAIL_USER,
			pass: process.env.EMAIL_PASS,
		},
	});

	// Verify link (would come from frontend)
	const verifyUrl = `${
		process.env.FRONTEND_URL || 'http://localhost:3000'
	}/verify-email?token=${verificationToken}&email=${email}`;

	// Email content
	const mailOptions = {
		from: process.env.EMAIL_FROM || '"Promptfy" <noreply@promptfy.com>',
		to: email,
		subject: 'Email Confirmation',
		html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Hello, ${name}</h2>
        <p>Please confirm your email by clicking on the following link:</p>
        <a href="${verifyUrl}" style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 4px;">
          Verify Email
        </a>
        <p>If you did not create this account, please ignore this email.</p>
      </div>
    `,
	};

	// Send email
	return transporter.sendMail(mailOptions);
};

export const sendResetPasswordEmail = async ({
	name,
	email,
	token,
}: ResetPasswordEmailOptions) => {
	// Create transporter
	const transporter = nodemailer.createTransport({
		host: process.env.EMAIL_HOST,
		port: Number(process.env.EMAIL_PORT) || 587,
		auth: {
			user: process.env.EMAIL_USER,
			pass: process.env.EMAIL_PASS,
		},
	});

	// Reset link (would come from frontend)
	const resetUrl = `${
		process.env.FRONTEND_URL || 'http://localhost:3000'
	}/reset-password?token=${token}&email=${email}`;

	// Email content
	const mailOptions = {
		from: process.env.EMAIL_FROM || '"Promptfy" <noreply@promptfy.com>',
		to: email,
		subject: 'Reset Password',
		html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Hello, ${name}</h2>
        <p>Please reset your password by clicking on the following link:</p>
        <a href="${resetUrl}" style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 4px;">
          Reset Password
        </a>
        <p>If you did not request a password reset, please ignore this email.</p>
        <p>This link is valid for 10 minutes.</p>
      </div>
    `,
	};

	// Send email
	return transporter.sendMail(mailOptions);
};
