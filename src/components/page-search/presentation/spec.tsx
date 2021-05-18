import PageSearchPresentation, { IPageSearchPresentationProps } from '.';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@test';
import jokesListMock from '../../__shared/__mocks__/jokes-list.mock.json';

import React from 'react';
import ProviderMock from '../../../test/ProviderMock';

const defaultPropsWithContent: IPageSearchPresentationProps = {
    currentQuery: 'music',
    initialLucky: true,
    initialQuery: 'music',
    initialResult: jokesListMock,
    loading: false,
    data: jokesListMock,
    hasContent: true,
    hasNoContent: false,
    error: false,
    isALucky: false,
    isAnEmpty: false,
    resetState: jest.fn(),
    currentTotal: 0,
    initialTotal: 0
};

describe('<PageSearchPresentation />', () => {
    let props: IPageSearchPresentationProps;

    beforeEach(() => {
        props = { ...defaultPropsWithContent };
    });

    it('should render properly the content when hasContent', async() => {

        const { getByTestId, queryByTestId } = render((
            <ProviderMock>
                <PageSearchPresentation {...props} />
            </ProviderMock>
        ), {});

        expect(getByTestId('results-component')).toBeInTheDocument();

        // Disappearance
        expect(queryByTestId('loading-component')).not.toBeInTheDocument();
        expect(queryByTestId('no-result-component')).not.toBeInTheDocument();
        expect(queryByTestId('error-message-component')).not.toBeInTheDocument();
        expect(queryByTestId('empty-search-component')).not.toBeInTheDocument();
    });

    it('should render properly the content when Lucky', async() => {

        props.isALucky = true;

        const { getByTestId, queryByTestId } = render((
            <ProviderMock>
                <PageSearchPresentation {...props} />
            </ProviderMock>
        ), {});

        expect(getByTestId('results-component')).toBeInTheDocument();

        // Disappearance
        expect(queryByTestId('loading-component')).not.toBeInTheDocument();
        expect(queryByTestId('no-result-component')).not.toBeInTheDocument();
        expect(queryByTestId('error-message-component')).not.toBeInTheDocument();
        expect(queryByTestId('empty-search-component')).not.toBeInTheDocument();
    });

    it('should render properly while loading', async() => {

        props.loading = true;
        props.hasContent = false;
        props.hasNoContent = true;
        props.data = [];
        props.initialResult = [];

        const { getByTestId, queryByTestId } = render((
            <ProviderMock>
                <PageSearchPresentation {...props} />
            </ProviderMock>
        ), {});

        expect(getByTestId('loading-component')).toBeInTheDocument();

        // Disappearance
        expect(queryByTestId('results-component')).not.toBeInTheDocument();
        expect(queryByTestId('no-result-component')).not.toBeInTheDocument();
        expect(queryByTestId('error-message-component')).not.toBeInTheDocument();
        expect(queryByTestId('empty-search-component')).not.toBeInTheDocument();
    });

    it('should render properly when errored', async() => {

        props.error = true;
        props.hasContent = false;
        props.hasNoContent = true;
        props.data = [];
        props.initialResult = [];

        const { getByTestId, queryByTestId } = render((
            <ProviderMock>
                <PageSearchPresentation {...props} />
            </ProviderMock>
        ), {});

        expect(getByTestId('error-message-component')).toBeInTheDocument();

        // Disappearance
        expect(queryByTestId('results-component')).not.toBeInTheDocument();
        expect(queryByTestId('no-result-component')).not.toBeInTheDocument();
        expect(queryByTestId('loading-component')).not.toBeInTheDocument();
        expect(queryByTestId('empty-search-component')).not.toBeInTheDocument();
    });

    it('should render properly when user submits an empty search', async() => {

        props.isAnEmpty = true;
        props.currentQuery = '';
        props.initialQuery = '';
        props.hasContent = false;
        props.hasNoContent = true;
        props.data = [];
        props.initialResult = [];

        const { getByTestId, queryByTestId } = render((
            <ProviderMock>
                <PageSearchPresentation {...props} />
            </ProviderMock>
        ), {});

        expect(getByTestId('empty-search-component')).toBeInTheDocument();

        // Disappearance
        expect(queryByTestId('results-component')).not.toBeInTheDocument();
        expect(queryByTestId('no-result-component')).not.toBeInTheDocument();
        expect(queryByTestId('loading-component')).not.toBeInTheDocument();
        expect(queryByTestId('error-message-component')).not.toBeInTheDocument();
    });

    it('should render properly when there are no results', async() => {

        props.hasContent = false;
        props.hasNoContent = true;
        props.data = [];
        props.initialResult = [];

        const { getByTestId, queryByTestId } = render((
            <ProviderMock>
                <PageSearchPresentation {...props} />
            </ProviderMock>
        ), {});

        expect(getByTestId('no-result-component')).toBeInTheDocument();

        // Disappearance
        expect(queryByTestId('results-component')).not.toBeInTheDocument();
        expect(queryByTestId('empty-search-component')).not.toBeInTheDocument();
        expect(queryByTestId('loading-component')).not.toBeInTheDocument();
        expect(queryByTestId('error-message-component')).not.toBeInTheDocument();
    });

    describe('Huge results', () => {
        it('Should show total results, while just using AWS Edge server that just support 1Mb payload', async () => {
            const FAKE_TOTAL = 9000;

            props.currentTotal = FAKE_TOTAL;
            props.initialTotal = FAKE_TOTAL;

            const { getByRole } = render((
                <ProviderMock>
                    <PageSearchPresentation {...props} />
                </ProviderMock>
            ), {});
            
            const disClaimerAboutPartialResults = getByRole(
                'heading',
                { 
                    name: 'About 10 results from 9000 in total'
                }
            );
            expect(disClaimerAboutPartialResults).toBeInTheDocument();
        });
    });
});