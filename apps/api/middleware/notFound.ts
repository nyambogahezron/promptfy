import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

const notFoundMiddleware = (_req: Request, res: Response, _next: NextFunction) => {
	res.status(StatusCodes.NOT_FOUND).send("Route does not exist");
	_next?.();
};

export default notFoundMiddleware;
