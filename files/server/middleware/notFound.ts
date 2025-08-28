import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

const notFoundMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	res.status(StatusCodes.NOT_FOUND).send('Route does not exist');
	next();
};

export default notFoundMiddleware;
