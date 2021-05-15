import JokeContainer from '.';
import { render } from '@test';
import '@testing-library/jest-dom/extend-expect';
import ProviderMock from '../../../test/ProviderMock';
import { fireEvent } from '@testing-library/react';
import React from 'react';
import jokeMock from '../../__shared/__mocks__/joke.mock.json';

const useRouter = jest.spyOn(require('next/router'), 'useRouter');

describe('<JokeContainer />', () => {
    const mockedRouterPush = jest.fn();
    jest.spyOn(console, 'error').mockImplementation(jest.fn);

    afterEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
    });

    describe('Home Button', () => {
        it('Should go home and clean the state when clicked on Home Logo', async () => {
            useRouter.mockImplementation(() => ({
                push: mockedRouterPush
            }));

            const { getByTestId } = render((
                <ProviderMock>
                    <JokeContainer joke={jokeMock} host="host.com.br" />
                </ProviderMock>
            ), {});

            const homeButton = getByTestId("home-button");
            expect(homeButton).toBeInTheDocument();
            fireEvent.click(homeButton);
            expect(mockedRouterPush).toBeCalledWith('/jokes/search');
        });
    });
});