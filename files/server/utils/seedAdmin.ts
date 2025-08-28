import dotenv from 'dotenv';
dotenv.config();

import connectDB from '../config/connectDB';
import User from '../models/User';
import crypto from 'crypto';
import bcrypt from 'bcrypt';

async function seedAdminUser() {
	try {
		const mongoUrl = process.env.MONGO_URL;
		if (!mongoUrl) {
			throw new Error('MONGO_URL is not defined');
		}

		// Check for Gemini API key (warn only, not required for seeding)
		if (!process.env.GEMINI_API_KEY) {
			console.warn(
				'Warning: GEMINI_API_KEY is not defined. Prompt generation will not work without it.'
			);
		}

		// Connect to the database
		await connectDB(mongoUrl);
		console.log('Connected to the database...');

		// Check if admin user already exists
		const existingAdmin = await User.findOne({ email: 'admin@example.com' });
		if (existingAdmin) {
			console.log('Admin user already exists!');
			process.exit(0);
		}

		// Hash password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash('admin123', salt);

		// Create admin user
		const adminUser = await User.create({
			name: 'Admin User',
			email: 'admin@example.com',
			password: hashedPassword,
			role: 'admin',
			isVerified: true,
			verified: new Date(),
		});

		console.log('Admin user created successfully!');
		console.log('Email: admin@example.com');
		console.log('Password: admin123');
		console.log('IMPORTANT: Change this password in production!');

		process.exit(0);
	} catch (error) {
		console.error('Error seeding admin user:', error);
		process.exit(1);
	}
}

// Run the seed function
seedAdminUser();
