import { getServerSideProps } from '../../../pages/jokes/[id]';
import jokeMock from '../../../components/__shared/__mocks__/joke.mock.json';
import axios from 'axios';

jest.mock('axios');

const fakeContext = {
    params: { id: 'fakeMockedId' },
    req: {
        headers: {
            host: 'domain.com.br'
        }
    }
};

describe('Joke Page => getServerSideProps()', () => {
    jest.spyOn(console, 'error').mockImplementation(jest.fn);

    afterEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
    });

    it('Should get expected successful response from API and pass as a prop', async () => {

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        axios.get = jest.fn(() =>
            Promise.resolve({ data: jokeMock }));

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const response = await getServerSideProps(fakeContext);
        expect(response).toEqual(
            expect.objectContaining({
                props: {
                    joke: jokeMock,
                    host: fakeContext.req.headers.host
                }
            }
        ));
    });


    it('Should send good props when errored', async () => {

        axios.get = jest.fn(() => Promise.reject('Joke not found'));

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const response = await getServerSideProps(fakeContext);
        expect(response).toEqual(
            expect.objectContaining({
                    props: {
                        joke: null
                    }
                }
            ));
    });
});
