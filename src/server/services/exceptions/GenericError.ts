import { AxiosResponse } from 'axios';

class GenericError extends Error {
	private response: AxiosResponse;
	constructor(message: string, response: AxiosResponse) {
		super(message);
		this.name = this.constructor.name;
		this.response = response;
	}
}

export default GenericError;
