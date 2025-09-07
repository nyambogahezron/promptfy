type props = {
	message: string;
	statusCode: number;
};

class CustomError extends Error {
	statusCode: number;
	constructor({ message, statusCode }: props) {
		super(message);
		this.statusCode = statusCode;
	}
}

export default CustomError;
