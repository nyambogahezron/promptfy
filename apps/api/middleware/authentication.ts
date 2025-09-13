import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import CustomError from "../errors/customError";
import { auth } from "../lib/auth";

declare global {
	namespace Express {
		interface Request {
			user?: {
				id: string;
				name: string;
				email: string;
				role: string;
				emailVerified: boolean;
			};
		}
	}
}

export const authenticateUser = async (req: Request, _res: Response, next: NextFunction) => {
	try {
		const session = await auth.api.getSession({
			headers: new Headers(req.headers as Record<string, string>),
		});

		if (!session) {
			throw new CustomError({
				message: "Authentication required",
				statusCode: StatusCodes.UNAUTHORIZED,
			});
		}

		const userWithRole = session.user as {
			id: string;
			name: string;
			email: string;
			emailVerified: boolean;
			role?: string;
		};

		req.user = {
			id: userWithRole.id,
			name: userWithRole.name,
			email: userWithRole.email,
			role: userWithRole.role || "user",
			emailVerified: userWithRole.emailVerified,
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
	return (req: Request, _res: Response, next: NextFunction) => {
		if (!req.user) {
			throw new CustomError({
				message: "Authentication required",
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
