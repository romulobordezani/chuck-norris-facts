import {
	ValidationError,
	ForbiddenError,
	FormError,
	GenericError,
	NotFoundError,
	TimeoutError,
	UnauthorizedError
} from '../exceptions';
import { AxiosError } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

// TODO - Replace with log4js, new relic, or winston
const log = console;

// TODO - Improve this method to show details of the external call, but only in the logs for monitoring
const getMeaningFullError = (error: AxiosError<any>) =>	`${error.message}`;

class ExceptionHandler {
	static cleanErrorMessage(message = ''): string {
		// eslint-disable-next-line no-control-regex
		return message.replace(/\u001b\[31m|\u001b\[39m/g, '');
	}

	static execute(
		req: NextApiRequest,
		res: NextApiResponse,
		error: AxiosError
	): void {
		try {
			ExceptionHandler.findRightError(req, res, error);
		} catch(customError) {
			ExceptionHandler.applySideEffects(req, res, customError);
		}
	}

	static applySideEffects(
		req: NextApiRequest,
		res: NextApiResponse,
		error: AxiosError
	): void {
		const { constructor: errorType, message } = error;
		const { cleanErrorMessage: clean } = ExceptionHandler;

		switch (errorType) {
			case ValidationError:
				log.error(`Validation error occurred: ${clean(message)}`);
				res.status(400);
				res.json({
					message: clean(message),
					response: error.response
				});
				break;

			case NotFoundError:
				log.error(`NotFound error occurred: ${clean(message)}`);
				res.status(404);
				res.json({
					message: clean(message),
					response: error.response
				});
				break;

			case ForbiddenError:
				log.error(`Forbidden action occurred: ${clean(message)}`);
				res.status(403);
				res.json({
					message: clean(message),
					response: error.response
				});
				break;

			case UnauthorizedError:
				log.error(`Unauthorized action occurred: ${clean(message)}`);
				res.status(401);
				res.json({
					message: clean(message),
					response: error.response
				});
				break;

			case TimeoutError:
				log.error(`Timeout occurred: ${clean(message)}`);
				res.status(401);
				res.json({
					message: clean(message),
					response: error.response
				});
				break;

			case FormError:
				log.error(`Form Validation Error occurred: ${clean(message)}`);
				/*
					Status 412 (Precondition Failed) is an *exotic work around to send form Errors from back-ends,
					allowing full control of the field in the front-end, sending errors and values to specific fields.
					Made to work easily with https://www.npmjs.com/package/formoose
				    https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status/412
				*/
				res.status(412);
				res.json(error?.response);
				break;

			default:
				log.error(`Unknown ERROR occurred: ${message}`);
				res.status(500);
				res.json({
					message: clean(message),
					response: error.response
				});
		}
	}

	static findRightError(
		req: NextApiRequest,
		res: NextApiResponse,
		error: AxiosError
	): void {
		let errorCode;
		let responseData = null;

		if ('response' in error && error?.response) {
			errorCode = error?.response?.status;
		}

		if ('code' in error && error?.code === 'ECONNABORTED') {
			errorCode = 'TIMEOUT';
		}

		if (error && error.response && error?.response?.data) {
			responseData = error?.response?.data;
		}

		const responseDataFields =
			responseData && responseData?.fields
				? responseData?.fields
				: null;

		switch (errorCode) {
			case 400:
				throw new ValidationError(
					getMeaningFullError(error),
					responseData
				);
			case 404:
				throw new NotFoundError(
					getMeaningFullError(error),
					responseData
				);
			case 403:
				throw new ForbiddenError(
					getMeaningFullError(error),
					responseData
				);
			case 401:
				throw new UnauthorizedError(
					getMeaningFullError(error),
					responseData
				);
			case 412:
				throw new FormError(
					getMeaningFullError(error),
					responseDataFields
				);
			case 'TIMEOUT':
				throw new TimeoutError(getMeaningFullError(error));
			default:
				throw new GenericError(getMeaningFullError(error), responseData);
		}
	}
}

export default ExceptionHandler;
