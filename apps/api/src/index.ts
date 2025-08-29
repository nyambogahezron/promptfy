import { log } from '@repo/logger';
import { createServer } from './server';
import connectDB from './config/connectDB';
import { seedDefaultTemplates } from './utils/seedTemplates';

const port = process.env.PORT || 5001;
const server = createServer();

async function startApp() {
	try {
		const mongoUrl = process.env.MONGO_URL;
		if (!mongoUrl) {
			log('MONGO_URL is not defined');
			throw new Error('MONGO_URL is not defined');
		}

		// Connect to MongoDB
		await connectDB(mongoUrl);
		log('Connected to MongoDB...');

		// Seed default templates
		await seedDefaultTemplates();

		// Start server
		server.listen(port, () => log(`Server is listening on port ${port}`));
	} catch (error) {
		log(error);
	}
}
startApp();