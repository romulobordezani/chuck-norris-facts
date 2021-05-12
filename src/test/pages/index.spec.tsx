import React from 'react';
import { screen } from '@testing-library/react';

import { render } from '..';
import SearchPage from '../../pages/jokes/search';
import ProviderMock from '../ProviderMock';

describe('<HomePage />', () => {
  it('Should render as expected', async () => {
    render((
        <ProviderMock>
          <SearchPage />
        </ProviderMock>
    ), {});
    const elementWithExpectedText = await screen.findAllByText('LUCKY');
    expect(elementWithExpectedText).toHaveLength(1);
  });
});
