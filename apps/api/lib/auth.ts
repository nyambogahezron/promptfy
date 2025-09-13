import { expo } from "@better-auth/expo";
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
import { sendResetPasswordEmail, sendVerificationEmail } from "../services/emailService";

const client = new MongoClient(process.env.MONGO_URL || '');
const db = client.db();

export const auth = betterAuth({
	database: mongodbAdapter(db),
	emailAndPassword: {
		enabled: true,
		requireEmailVerification: true,
		sendResetPassword: async ({
			user,
			url,
		}: {
			user: { email: string; name: string };
			url: string;
		}) => {
			const urlObj = new URL(url);
			const token = urlObj.searchParams.get("token") || "";

			await sendResetPasswordEmail({
				name: user.name,
				email: user.email,
				token,
			});
		},
		sendVerificationEmail: async ({
			user,
			url,
		}: {
			user: { email: string; name: string };
			url: string;
		}) => {
			const urlObj = new URL(url);
			const token = urlObj.searchParams.get("token") || "";

			await sendVerificationEmail({
				name: user.name,
				email: user.email,
				verificationToken: token,
			});
		},
	},

	secret:
		process.env.BETTER_AUTH_SECRET ||
		process.env.JWT_SECRET ||
		"default-secret-change-in-production",
	baseURL: process.env.BETTER_AUTH_URL || "http://localhost:5000",

	session: {
		expiresIn: 60 * 60 * 24 * 7,
		updateAge: 60 * 60 * 24,
	},
	user: {
		additionalFields: {
			role: {
				type: "string",
				defaultValue: "user",
				input: false,
			},
		},
	},
	plugins: [expo()],
});

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;
