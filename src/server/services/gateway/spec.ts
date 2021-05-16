import Gateway, { paramsSerializer } from '.';
import type { NextApiRequest, NextApiResponse } from 'next';


// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const fakeRequest: NextApiRequest = {};
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const fakeResponse: NextApiResponse = {};

describe('Gateway', () => {
    it('should add axios instance and interceptors', () => {
        const gateway = new Gateway(fakeRequest, fakeResponse, {});
        expect (gateway.axios).toBeDefined();
        expect (gateway.axios.interceptors).toBeDefined();
    });

    it('should add axios stuff without a config', () => {
        const gateway = new Gateway(fakeRequest, fakeResponse);
        expect (gateway.axios).toBeDefined();
        expect (gateway.axios.interceptors).toBeDefined();
    });

    it('should have a params serializer capable to remove white spaces and encode as URI', () => {
        const query = {
            paramWithWhiteSpaces: 'param with white spaces',
            ordinaryParam: 'stringWithoutWhitSpaces'
        };

        expect(paramsSerializer(query)).toBe('paramWithWhiteSpaces=param%20with%20white%20spaces&ordinaryParam=stringWithoutWhitSpaces');
    });
});