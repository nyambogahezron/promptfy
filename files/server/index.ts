import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response } from 'express';
import connectDB from './config/connectDB';
import notFoundMiddleware from './middleware/notFound';
import authRouter from './routes/authRoutes';
import promptRouter from './routes/promptRoutes';
import { StatusCodes } from 'http-status-codes';
import { seedDefaultTemplates } from './utils/seedTemplates';

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static files
app.use(express.static('public'));

// Routes
app.get('/api/v1/health', (req: Request, res: Response) => {
	res.status(StatusCodes.OK).json({ status: 'OK', message: 'API is running' });
});

// Authentication routes
app.use('/api/v1/auth', authRouter);

// Prompt routes
app.use('/api/v1/prompts', promptRouter);

// Sharing and collaboration routes
import shareRouter from './routes/shareRoutes';
app.use('/api/v1/share', shareRouter);

// Not found and error handler middleware
app.use('*', notFoundMiddleware);

async function startApp() {
	try {
		const mongoUrl = process.env.MONGO_URL;
		if (!mongoUrl) {
			throw new Error('MONGO_URL is not defined');
		}

		// Connect to MongoDB
		await connectDB(mongoUrl);
		console.log('Connected to MongoDB...');

		// Seed default templates
		await seedDefaultTemplates();

		// Start server
		app.listen(port, () => console.log(`Server is listening on port ${port}`));
	} catch (error) {
		console.log(error);
	}
}
startApp();
