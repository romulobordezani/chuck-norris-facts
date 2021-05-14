import React from 'react';
import { screen } from '@testing-library/react';
import { render } from '@test';
import JokePage from '../../../pages/jokes/[id]';
import ProviderMock from '../../ProviderMock';
import jokeMock from '../../../components/__shared/__mocks__/joke.mock.json';

describe('<JokePage />', () => {
  it('Should render as expected', async () => {
    render((
        <ProviderMock>
          <JokePage host="host.com" joke={jokeMock}/>
        </ProviderMock>
    ), {});
    const elementWithExpectedText = await screen.findAllByText(jokeMock.value);
    expect(elementWithExpectedText).toHaveLength(1);
  });

    it('Should render a not Found Joke', async () => {
        render((
            <ProviderMock>
                <JokePage  host="host.com" joke={null} />
            </ProviderMock>
        ), {});
        const elementWithExpectedText = await screen.findAllByText('404');
        expect(elementWithExpectedText).toHaveLength(1);
    });
});
