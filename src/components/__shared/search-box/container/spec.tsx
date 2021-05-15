import SearchBoxContainer from '.';
import { render } from '@test';
import '@testing-library/jest-dom/extend-expect';
import ProviderMock from '../../../../test/ProviderMock';
import { fireEvent, screen } from '@testing-library/react';
import React from 'react';
import axios from 'axios';
import { waitForState } from '@utils';

import jokesList from '../../__mocks__/jokes-list.mock.json';

jest.mock('axios');

const useRouter = jest.spyOn(require('next/router'), 'useRouter');

describe('<SearchBoxContainer />', () => {
    const mockedRouterPush = jest.fn();
    jest.spyOn(console, 'error').mockImplementation(jest.fn);

    afterEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
    });

    it('Should render as expected', async () => {
        render((
            <ProviderMock>
                <SearchBoxContainer initialQuery={'mockQuery'} />
            </ProviderMock>
        ), {});

        const inputSearch = await  screen.getByRole('searchbox');
        expect(inputSearch).toBeInTheDocument();

        const submitButton = await  screen.getByRole('button', { name: /Search/i } );
        expect(submitButton).toBeInTheDocument();

        const luckyButton = await  screen.getByRole('button', { name: /LUCKY/i } );
        expect(luckyButton).toBeInTheDocument();
    });

    describe('SEARCH', () => {
        it('Do not calls Redux action when Submitted empty', async () => {
            useRouter.mockImplementationOnce(() => ({
                push: mockedRouterPush
            }));

            render((
                <ProviderMock>
                    <SearchBoxContainer initialQuery={''} />
                </ProviderMock>
            ), {});

            const submitButton = await  screen.getByRole('button', { name: /Search/i } );
            fireEvent.click(submitButton);
            expect(mockedRouterPush).toBeCalledWith('/jokes/search?query=');
        });

        it('Calls the right Redux action when Submitted as expected', async () => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            axios.get.mockResolvedValue({ data: { result: jokesList } });
            const QUERY_STRING = 'mockQuery';

            useRouter.mockImplementationOnce(() => ({
                push: mockedRouterPush
            }));

            render((
                <ProviderMock>
                    <SearchBoxContainer initialQuery={QUERY_STRING} />
                </ProviderMock>
            ), {});

            const submitButton = await  screen.getByRole('button', { name: /Search/i } );
            fireEvent.click(submitButton);
            expect(mockedRouterPush).toBeCalled();
            expect(axios.get).toBeCalledWith(
                '/api/chuck-norris-facts/jokes/search',
                { params: { query: QUERY_STRING } }
            );
        });

        it('Dispatch ERROR reducer when SEARCH request fails', async () => {
            const QUERY_STRING = 'mockQuery';
            const ERROR_STRING = 'ERROR_STRING_MATCHER';

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            axios.get.mockRejectedValue(ERROR_STRING);

            useRouter.mockImplementationOnce(() => ({
                push: mockedRouterPush
            }));

            render((
                <ProviderMock>
                    <SearchBoxContainer initialQuery={QUERY_STRING} />
                </ProviderMock>
            ), {});

            const submitButton = await  screen.getByRole('button', { name: /Search/i } );
            fireEvent.click(submitButton);

            expect(mockedRouterPush).toBeCalled();
            expect(axios.get).toBeCalledWith(
                '/api/chuck-norris-facts/jokes/search',
                { params: { query: QUERY_STRING } }
            );

            await waitForState();

            expect(console.error).toBeCalledWith(ERROR_STRING);
        });
    });

    describe('LUCKY', () => {
        it('Calls the right Redux action when Luckily Submitted as expected', async () => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            axios.get.mockResolvedValue({ data: { result: jokesList } });
            const QUERY_STRING = 'mockQuery';

            useRouter.mockImplementationOnce(() => ({
                push: mockedRouterPush
            }));

            render((
                <ProviderMock>
                    <SearchBoxContainer initialQuery={QUERY_STRING} />
                </ProviderMock>
            ), {});

            const luckyButton = await  screen.getByRole('button', { name: /LUCKY/i } );
            fireEvent.click(luckyButton);
            expect(mockedRouterPush).toBeCalled();
            expect(axios.get).toBeCalledWith(
                '/api/chuck-norris-facts/jokes/search',
                { params: { query: QUERY_STRING } }
            );
        });

        it('Dispatch ERROR reducer when LUCKY request fails', async () => {
            const QUERY_STRING = 'mockQuery';
            const ERROR_STRING = 'ERROR_STRING_MATCHER';

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            axios.get.mockRejectedValue(ERROR_STRING);

            useRouter.mockImplementationOnce(() => ({
                push: mockedRouterPush
            }));

            render((
                <ProviderMock>
                    <SearchBoxContainer initialQuery={QUERY_STRING} />
                </ProviderMock>
            ), {});

            const luckyButton = await screen.getByRole('button', { name: /LUCKY/i } );
            fireEvent.click(luckyButton);

            expect(mockedRouterPush).toBeCalled();
            expect(axios.get).toBeCalledWith(
                '/api/chuck-norris-facts/jokes/search',
                { params: { query: QUERY_STRING } }
            );

            await waitForState();

            expect(console.error).toBeCalledWith(ERROR_STRING);
        });

        it('Do not calls when Luckily Submitted empty', async () => {
            useRouter.mockImplementationOnce(() => ({
                push: mockedRouterPush
            }));

            render((
                <ProviderMock>
                    <SearchBoxContainer initialQuery={''} />
                </ProviderMock>
            ), {});

            const luckyButton = await  screen.getByRole('button', { name: /LUCKY/i } );
            fireEvent.click(luckyButton);
            expect(mockedRouterPush).toBeCalledWith('/jokes/search?query=&lucky=true');
        });
    });
});