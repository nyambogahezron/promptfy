import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import CustomError from "../errors/customError";

interface DecodedToken {
	userId: string;
	name: string;
	role: string;
}

interface AuthRequest extends Request {
	user?: {
		userId: string;
		name: string;
		role: string;
	};
}

export const authenticateUser = async (req: AuthRequest, _res: Response, next: NextFunction) => {
	const authHeader = req.headers.authorization;

	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		throw new CustomError({
			message: "Authentication invalid",
			statusCode: StatusCodes.UNAUTHORIZED,
		});
	}

	const token = authHeader.split(" ")[1];

	try {
		const secret = process.env.JWT_SECRET;
		if (!secret) throw new Error("Missing JWT secret");
		const decoded = jwt.verify(token, secret) as DecodedToken;

		req.user = {
			userId: decoded.userId,
			name: decoded.name,
			role: decoded.role,
		};
		next();
	} catch (_error) {
		throw new CustomError({
			message: "Authentication invalid",
			statusCode: StatusCodes.UNAUTHORIZED,
		});
	}
};

export const authorizePermissions = (...roles: string[]) => {
	return (req: AuthRequest, _res: Response, next: NextFunction) => {
		if (!req.user) {
			throw new CustomError({
				message: "Authentication invalid",
				statusCode: StatusCodes.UNAUTHORIZED,
			});
		}

		if (!roles.includes(req.user.role)) {
			throw new CustomError({
				message: "Unauthorized to access this route",
				statusCode: StatusCodes.FORBIDDEN,
			});
		}
		next();
	};
};
