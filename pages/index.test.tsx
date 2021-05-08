import React from 'react';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { render } from '../test/testUtils';
import Home from './index';

describe('Home page', () => {
  it('Should render as expected', async () => {
    render(<Home />, {});
    const elementWithExpectedText = await screen.findAllByText('Hello World!');
    expect(elementWithExpectedText).toHaveLength(1);
  });
});
