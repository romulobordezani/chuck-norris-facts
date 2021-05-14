import { createMocks } from 'node-mocks-http';
import search from '../../../../../../pages/api/chuck-norris-facts/jokes/search';
import jokeMock from '../../../../../../components/__shared/__mocks__/joke.mock.json';

const mockResponse = jest.fn();

jest.mock('../../../../../../server/services/gateway', () => {
    return jest.fn().mockImplementation(() => {
        return {
            axios: {
                get: mockResponse
            }
        };
    });
});

describe('/api/chuck-norris-facts/jokes/[id]', () => {
    it('Searchs for a joke', async () => {
        const { req, res } = createMocks({
            method: 'GET',
            query: {
                query: 'norris',
            }
        });

        mockResponse.mockImplementation(() => {
            res.json(jokeMock);
        });

        await search(req, res);

        expect(res._getStatusCode()).toBe(200);
        expect(res._getJSONData()).toEqual(
            expect.objectContaining(jokeMock)
        );
    });

    it('should returns a 500 status on error', async () => {
        const errMessage = { message : 'search mock Error' };
        const { req, res } = createMocks();

        mockResponse.mockImplementation(() => {
            res.status(500);
            res.json(errMessage);
        });

        await search(req, res);

        expect(res._getStatusCode()).toBe(500);
        expect(res._getJSONData()).toEqual(
            expect.objectContaining(errMessage)
        );
    });

    it('should returns a 404 when not found', async () => {
        const errMessage = { message : 'not found mock Error' };
        const { req, res } = createMocks();

        mockResponse.mockImplementation(() => {
            res.status(404);
            res.json(errMessage);
        });

        await search(req, res);

        expect(res._getStatusCode()).toBe(404);
        expect(res._getJSONData()).toEqual(
            expect.objectContaining(errMessage)
        );
    });
});