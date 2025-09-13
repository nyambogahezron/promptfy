import { fromNodeHeaders, toNodeHandler } from "better-auth/node";
import { json, urlencoded } from "body-parser";
import cors from "cors";
import express, { type Express, type Request, type Response } from "express";
import { StatusCodes } from "http-status-codes";
import morgan from "morgan";
import { auth } from "./lib/auth.js";
import notFoundMiddleware from "./middleware/notFound.js";
import promptRouter from "./routes/promptRoutes.js";
import shareRouter from "./routes/shareRoutes.js";

export const createServer = (): Express => {
	const app = express();
	app
		.disable("x-powered-by")
		.use(morgan("dev"))
		.use(urlencoded({ extended: true }))
		.use(json())
		.use(cors())
		.use(express.json({ limit: "10mb" }))
		.use(express.urlencoded({ extended: true, limit: "10mb" }))
		.use(express.static("public"))
		.use(
			cors({
				origin: "http://localhost:3000",
				methods: ["GET", "POST", "PUT", "DELETE"],
				credentials: true,
			})
		)
		.get("/api/v1/health", (_req: Request, res: Response) => {
			res.status(StatusCodes.OK).json({ status: "OK", message: "API is running" });
		})
		.use("/api/v1/prompts", promptRouter)
		.use("/api/v1/share", shareRouter)
		.get("/message/:name", (req, res) => {
			return res.json({ message: `hello ${req.params.name}` });
		})
		.get("/api/me", async (req, res) => {
			const session = await auth.api.getSession({
				headers: fromNodeHeaders(req.headers),
			});
			return res.json(session);
		})
		.use("/api/auth/*", toNodeHandler(auth)) // better-auth routes

		.use(notFoundMiddleware);

	return app;
};
