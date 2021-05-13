// 🚨 related to `/pages` directory!
import { createMocks } from 'node-mocks-http';
import getJoke from '../../../../../pages/api/chuck-norris-facts/jokes/[id]';

describe('/api/chuck-norris-facts/jokes/[id]', () => {
    test('returns a joke by IDs', async () => {
        const { req, res } = createMocks({
            method: 'GET',
            query: {
                query: 'chuck',
            },
        });

        await getJoke(req, res);

        expect(res._getStatusCode()).toBe(500);
        expect(JSON.parse(res._getData())).toEqual(
            expect.objectContaining({
                message: 'Your favorite animal is dog',
            }),
        );
    });
});