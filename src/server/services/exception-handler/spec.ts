import ExceptionHandler from '.';
import type { NextApiResponse } from 'next';
import { AxiosError } from 'axios';
import { NextApiRequest } from 'next';
import deepmerge from 'deepmerge';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const fakeRequest: NextApiRequest = {};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const fakeResponse: NextApiResponse = {
    status: jest.fn(),
    json: jest.fn()
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const fakeError: AxiosError = {
    response: {
        status: 400,
        data: 'mockedData',
        config: {},
        headers: {},
        request: {},
        statusText: ''
    }
};

describe('ExceptionHandler', () => {
    describe('cleanErrorMessage()', () => {
        it('should clean ANSI colors / styles', () => {
            const cleanedString = ExceptionHandler.cleanErrorMessage("\x1B[90mHello World\x1B[39m");
            expect (cleanedString).toBe('Hello World');
        });

        it('should keep string when without colors', () => {
            const cleanedString = ExceptionHandler.cleanErrorMessage('Hello World');
            expect (cleanedString).toBe('Hello World');
        });

        it('should keep string when without colors', () => {
            const cleanedString = ExceptionHandler.cleanErrorMessage();
            expect (cleanedString).toBe('');
        });
    });

    describe('execute()', () => {

        let error: AxiosError;
        jest.spyOn(console, 'error').mockImplementation(jest.fn);

        beforeEach(() => {
            error = deepmerge({}, fakeError );

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            console.error.mockReset();
        });

        it('should throw a validation Error', () => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            error.response.status = 400;
            ExceptionHandler.execute(fakeRequest, fakeResponse, error);
            expect(console.error).toBeCalledWith('Validation error occurred: mockedData');
        });

        it('should throw a Forbidden Error', () => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            error.response.status = 403;
            ExceptionHandler.execute(fakeRequest, fakeResponse, error);
            expect(console.error).toBeCalledWith('Forbidden action occurred: mockedData');
        });

        it('should throw a Forbidden Error', () => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            error.response.status = 404;
            ExceptionHandler.execute(fakeRequest, fakeResponse, error);
            expect(console.error).toBeCalledWith('NotFound error occurred: mockedData');
        });

        it('should throw a Unauthorized Error', () => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            error.response.status = 401;
            ExceptionHandler.execute(fakeRequest, fakeResponse, error);
            expect(console.error).toBeCalledWith('Unauthorized action occurred: mockedData');
        });

        it('should throw a Timeout Error', () => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            error.response.status = 412;
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            error.response.data = {
                fields: []
            };
            ExceptionHandler.execute(fakeRequest, fakeResponse, error);
            expect(console.error).toBeCalledWith('Form Validation Error occurred');
        });

        it('should throw an Unknown Error', () => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            error.response.status = 500;
            ExceptionHandler.execute(fakeRequest, fakeResponse, error);
            expect(console.error).toBeCalledWith('Unknown ERROR occurred: mockedData');
        });

        it('should throw a Timeout Error', () => {
            error.code = 'ECONNABORTED';
            ExceptionHandler.execute(fakeRequest, fakeResponse, error);
            expect(console.error).toBeCalledWith('Timeout occurred');
        });
    });
});