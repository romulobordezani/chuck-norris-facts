import SearchContainer from '.';
import { render } from '@test';
import '@testing-library/jest-dom/extend-expect';
import ProviderMock from '../../../test/ProviderMock';
import { fireEvent, screen } from '@testing-library/react';
import React from 'react';
import SearchBoxContainer from "../../__shared/search-box/container";

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

    describe('Home Button', () => {
        it('Should go home and clean the state when clicked on Home Logo', async () => {
            useRouter.mockImplementation(() => ({
                push: mockedRouterPush
            }));

            const { getByTestId } = render((
                <ProviderMock>
                    <SearchContainer
                        initialQuery={''}
                        initialLucky={false}
                        initialResult={[]}
                        initialTotal={0}
                    />
                </ProviderMock>
            ), {});

            const homeButton = getByTestId('home-button');
            expect(homeButton).toBeInTheDocument();
            fireEvent.click(homeButton);
            expect(mockedRouterPush).toBeCalledWith('/jokes/search');
        });
    });
});