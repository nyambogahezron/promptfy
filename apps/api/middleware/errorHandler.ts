import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import CustomError from "../errors/customError.js";

export const errorHandlerMiddleware = (
	err: unknown,
	_req: Request,
	res: Response,
	_next: NextFunction
): Response => {
	console.error(err);

	const defaultMsg = "Something went wrong, please try again later";

	const customError = {
		statusCode: err instanceof CustomError ? err.statusCode : StatusCodes.INTERNAL_SERVER_ERROR,
		msg: err instanceof Error ? err.message : defaultMsg,
	};

	const e = err as {
		name?: string;
		errors?: Record<string, { message?: string }>;
		code?: number;
		keyValue?: Record<string, unknown>;
		value?: unknown;
	};

	if (e?.name === "ValidationError") {
		const errors = e.errors ?? {};
		customError.msg = Object.values(errors)
			.map((item) => item?.message ?? String(item))
			.join(", ");
		customError.statusCode = StatusCodes.BAD_REQUEST;
	}

	if (e?.code && e.code === 11000) {
		const keyValue = e.keyValue ?? {};
		customError.msg = `Duplicate value entered for ${Object.keys(
			keyValue
		)} field, please choose another value`;
		customError.statusCode = StatusCodes.BAD_REQUEST;
	}

	if (e?.name === "CastError") {
		customError.msg = `No item found with id: ${String(e.value)}`;
		customError.statusCode = StatusCodes.NOT_FOUND;
	}

	return res.status(customError.statusCode).json({ msg: customError.msg });
};
