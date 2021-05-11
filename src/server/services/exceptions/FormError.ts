import { IFormField } from '../../../types';

class FormError extends Error {
	private fields: IFormField[];

	constructor(message: string, fieldErrors: IFormField[]) {
		super(message);
		this.name = this.constructor.name;
		this.fields = fieldErrors;
	}
}

export default FormError;
