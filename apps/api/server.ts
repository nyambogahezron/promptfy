import { json, urlencoded } from "body-parser";
import cors from "cors";
import express, { type Express, type Request, type Response } from "express";
import { StatusCodes } from "http-status-codes";
import morgan from "morgan";
import notFoundMiddleware from "./middleware/notFound";
import authRouter from "./routes/authRoutes";
import promptRouter from "./routes/promptRoutes";
import shareRouter from "./routes/shareRoutes";

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

		.get("/api/v1/health", (_req: Request, res: Response) => {
			res.status(StatusCodes.OK).json({ status: "OK", message: "API is running" });
		})

		.use("/api/v1/auth", authRouter)
		.use("/api/v1/prompts", promptRouter)
		.use("/api/v1/share", shareRouter)
		.use("*", notFoundMiddleware)
		.get("/message/:name", (req, res) => {
			return res.json({ message: `hello ${req.params.name}` });
		})
		.get("/status", (_, res) => {
			return res.json({ ok: true });
		});

	return app;
};
