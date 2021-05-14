import { createMocks } from 'node-mocks-http';
import getJoke from '../../../../../pages/api/chuck-norris-facts/jokes/[id]';
import jokeMock from '../../../../../components/__shared/__mocks__/joke.mock.json';

const mockResponse = jest.fn();

jest.mock('../../../../../server/services/gateway', () => {
    return jest.fn().mockImplementation(() => {
        return {
            axios: {
                get: mockResponse
            }
        };
    });
});

describe('/api/chuck-norris-facts/jokes/[id]', () => {
    it('returns a joke by its ID', async () => {
        const { req, res } = createMocks();

        mockResponse.mockImplementation(() => {
            res.json(jokeMock);
        });

        await getJoke(req, res);

        expect(res._getStatusCode()).toBe(200);
        expect(res._getJSONData()).toEqual(
            expect.objectContaining(jokeMock)
        );
    });

    it('should returns a 500 status on error', async () => {
        const errMessage = { message : 'mock Error' };
        const { req, res } = createMocks();

        mockResponse.mockImplementation(() => {
            res.status(500);
            res.json(errMessage);
        });

        await getJoke(req, res);

        expect(res._getStatusCode()).toBe(500);
        expect(res._getJSONData()).toEqual(
            expect.objectContaining(errMessage)
        );
    });

    it('should returns a 404 not found error', async () => {
        const errMessage = { message : 'not found Error' };
        const { req, res } = createMocks();
        const HTTP_STATUS = 404;

        mockResponse.mockImplementation(() => {
            res.status(HTTP_STATUS);
            res.json(errMessage);
        });

        await getJoke(req, res);

        expect(res._getStatusCode()).toBe(HTTP_STATUS);
        expect(res._getJSONData()).toEqual(
            expect.objectContaining(errMessage)
        );
    });
});