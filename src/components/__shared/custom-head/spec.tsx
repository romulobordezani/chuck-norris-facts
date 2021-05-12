import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@test';

import fakeJoke from '../__mocks__/joke.mock.json';

jest.mock('next/head', () => {
    return {
        __esModule: true,
        default: ({ children }: { children: Array<React.ReactElement> }) => {
            return <>{children}</>;
        },
    };
});

import CustomHead, { DEFAULT_TITLE } from './index';

describe('<CustomHead />', () => {
    it('Should render default Option', async () => {
        render(<CustomHead />, {});
        const titleElement = await screen.getByText(DEFAULT_TITLE, { exact: false });

        expect(titleElement).toBeInTheDocument();
    });

    it('Should render a Custom Title', async () => {
        const CUSTOM_TITLE = 'Custom Title';
        render(<CustomHead title={CUSTOM_TITLE} />, {});
        const titleElement = await screen.getByText(CUSTOM_TITLE, { exact: false });

        expect(titleElement).toBeInTheDocument();
    });

    it('Should NOT render OGs without a joke sent', async () => {
        const { queryByTestId } = render(<CustomHead />, {});
        expect(queryByTestId("og-meta")).not.toBeInTheDocument();
    });

    it('Should render an OG meta', async () => {
        const { getByTestId } = render(<CustomHead joke={fakeJoke} host={'domain.com.br'}/>, {});
        expect(getByTestId("og-meta")).toHaveAttribute("content", fakeJoke.value);
    });
});