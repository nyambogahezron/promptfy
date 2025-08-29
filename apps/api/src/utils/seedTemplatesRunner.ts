import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import connectDB from '../config/connectDB';
import { seedDefaultTemplates } from './seedTemplates';

/**
 * Simple utility to seed default prompt templates
 */
async function seedTemplatesRunner() {
	try {
		console.log('Seeding default templates...');

		const mongoUrl = process.env.MONGO_URL;
		if (!mongoUrl) {
			throw new Error('MONGO_URL is not defined');
		}

		// Connect to the database
		await connectDB(mongoUrl);
		console.log('Connected to the database...');

		// Seed the templates
		await seedDefaultTemplates();

		console.log('Templates seeded successfully!');

		// Close the connection
		await mongoose.connection.close();
		process.exit(0);
	} catch (error: any) {
		console.error('Error seeding templates:', error.message);
		process.exit(1);
	}
}

// Run the seeding function
seedTemplatesRunner();
