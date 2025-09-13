import dotenv from "dotenv";

dotenv.config();

import { log } from "@repo/logger";
import connectDB from "./config/connectDB";
import { createServer } from "./server";

const port = process.env.PORT || 5001;
const server = createServer();

async function startApp() {
	try {
		const mongoUrl = process.env.MONGO_URL;
		if (!mongoUrl) {
			log("MONGO_URL is not defined");
			throw new Error("MONGO_URL is not defined");
		}
		await connectDB(mongoUrl);
		log("Connected to MongoDB...");

		server.listen(port, () => log(`Server is listening on port ${port}`));
	} catch (error) {
		log(error);
	}
}
startApp();
