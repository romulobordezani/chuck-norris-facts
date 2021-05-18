import { getServerSideProps, ISearchPageProps } from '../../../../pages/jokes/search';
import jokeMock from '../../../../components/__shared/__mocks__/joke.mock.json';
import axios from 'axios';
import deepmerge from 'deepmerge';

jest.mock('axios');

const fakeContext = {
    params: { id: 'fakeMockedId' },
    query: {
        query: 'chuck-norris-did-it-string'
    }
};

interface IEmptyProps {
    props: ISearchPageProps;
}

const emptyProps: IEmptyProps = {
    props: {
        initialResult: [],
        initialQuery: '',
        initialLucky: null,
        initialTotal: 0
    }
};

describe('Search Page => getServerSideProps', () => {
    let responseInProps: IEmptyProps;
    let runningContext: { query: { query: string }; params: { id: string } };
    jest.spyOn(console, 'error').mockImplementation(jest.fn);

    beforeEach(() => {
        responseInProps = deepmerge({}, emptyProps);
        runningContext = deepmerge({}, fakeContext);
    });

    afterEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
    });

    it('Should get expected successful response from API and pass as props', async () => {

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        axios.get = jest.fn(() =>
            Promise.resolve({ data: { result : [jokeMock] } }));

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const response = await getServerSideProps(runningContext);

        expect(response).toEqual(
            expect.objectContaining({
                    props: {
                        initialResult: [jokeMock],
                        initialQuery: runningContext?.query?.query,
                        initialLucky: null
                    }
                }
            ));
    });

    it('Should get expected successful response from API and pass as props', async () => {

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        axios.get = jest.fn(() =>
            Promise.resolve({ data: { result : [jokeMock] } }));

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const response = await getServerSideProps(runningContext);

        expect(response).toEqual(
            expect.objectContaining({
                    props: {
                        initialResult: [jokeMock],
                        initialQuery: runningContext?.query?.query,
                        initialLucky: null
                    }
                }
            ));
    });


    it('Should send good props when errored', async () => {
        axios.get = jest.fn(() => Promise.reject('No results'));
        responseInProps.props.initialQuery = runningContext?.query?.query;

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const response = await getServerSideProps(runningContext);
        expect(response).toEqual(expect.objectContaining(responseInProps));
    });

    it('Should send good props when getting an empty query', async () => {
        runningContext.query.query = '';
        delete responseInProps.props.initialQuery;

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const response = await getServerSideProps(runningContext);
        expect(response).toEqual(expect.objectContaining(responseInProps));
        expect(axios.get).not.toHaveBeenCalled();
    });

    it('Should send good props when getting an undefined query', async () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        delete runningContext.query.query;
        delete responseInProps.props.initialQuery;

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const response = await getServerSideProps(runningContext);
        expect(response).toEqual(expect.objectContaining(responseInProps));
        expect(axios.get).not.toHaveBeenCalled();
    });

    it('Should block too short calls', async () => {
        runningContext.query.query = '12';
        responseInProps.props.initialQuery = runningContext?.query?.query;

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const response = await getServerSideProps(runningContext);
        expect(response).toEqual(expect.objectContaining(responseInProps));
        expect(axios.get).not.toHaveBeenCalled();
    });
});
