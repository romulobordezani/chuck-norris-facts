import React from 'react';
import { screen } from '@testing-library/react';

import { render } from '@test';
import HomePage from '../../pages';

describe('<HomePage />', () => {
  it('Should render as expected', async () => {
    render(<HomePage />, {});
    const elementWithExpectedText = await screen.findAllByText('Pesquisar');
    expect(elementWithExpectedText).toHaveLength(1);
  });
});
