import React from 'react';
import { screen } from '@testing-library/react';

import { render } from '..';
import SearchPage from '../../pages/jokes/search';

describe('<HomePage />', () => {
  it('Should render as expected', async () => {
    render(<SearchPage />, {});
    const elementWithExpectedText = await screen.findAllByText('Pesquisar');
    expect(elementWithExpectedText).toHaveLength(1);
  });
});
