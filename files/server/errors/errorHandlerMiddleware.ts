import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import CustomError from './customError';

export const errorHandlerMiddleware = (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction
): Response => {
	console.error(err);

	let customError = {
		statusCode:
			err instanceof CustomError
				? err.statusCode
				: StatusCodes.INTERNAL_SERVER_ERROR,
		msg: err.message || 'Something went wrong, please try again later',
	};

	// Handle mongoose validation errors
	if (err.name === 'ValidationError') {
		customError.msg = Object.values((err as any).errors)
			.map((item: any) => item.message)
			.join(', ');
		customError.statusCode = StatusCodes.BAD_REQUEST;
	}

	// Handle duplicate key error
	if ((err as any).code && (err as any).code === 11000) {
		customError.msg = `Duplicate value entered for ${Object.keys(
			(err as any).keyValue
		)} field, please choose another value`;
		customError.statusCode = StatusCodes.BAD_REQUEST;
	}

	// Handle cast error
	if (err.name === 'CastError') {
		customError.msg = `No item found with id: ${(err as any).value}`;
		customError.statusCode = StatusCodes.NOT_FOUND;
	}

	return res.status(customError.statusCode).json({ msg: customError.msg });
};
