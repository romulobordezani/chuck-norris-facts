import React from 'react';
import { screen } from '@testing-library/react';

import { render } from '..';
import HomePage from '../../pages/search';

describe('<HomePage />', () => {
  it('Should render as expected', async () => {
    render(<HomePage />, {});
    const elementWithExpectedText = await screen.findAllByText('Pesquisar');
    expect(elementWithExpectedText).toHaveLength(1);
  });
});
