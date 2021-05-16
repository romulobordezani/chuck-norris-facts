import React, { FunctionComponent, ReactElement } from 'react';
import Header from '../../__shared/header';
import Loading from '../../__shared/loading';
import Results from './results';
import NoResults from './no-results';
import { IJoke, IQuery } from '@types';
import ErrorMessage from '../../__shared/error-message';
import { ISearchPageProps } from '../../../pages/jokes/search';
import EmptySearch from './empty-search';
import InitialResult from "./initial-results";

export interface IPageSearchPresentationProps extends ISearchPageProps {
    currentQuery: IQuery;
    loading: boolean;
    data: IJoke[];
    hasContent: boolean;
    hasNoContent: boolean;
    error: boolean;
    isALucky: boolean;
    isAnEmpty: boolean;
    resetState(): void;
}

const PageSearchPresentation: FunctionComponent<IPageSearchPresentationProps> = ({
    currentQuery,
    initialLucky,
    initialQuery,
    initialResult,
    loading,
    data,
    hasContent,
    hasNoContent,
    error,
    isALucky,
    isAnEmpty,
    resetState
}): ReactElement => {
    const query = currentQuery ? currentQuery : initialQuery;

    return (
        <>
            <Header {...{ initialResult, initialLucky, initialQuery, resetState }} />

            {!loading && hasNoContent && !query && !error && !isAnEmpty && (
                <InitialResult />
            )}

            {loading && (
                <Loading />
            )}

            {hasContent && !loading && !isAnEmpty && (
                <Results
                    result={data}
                    query={query}
                    isALucky={isALucky}
                />
            )}

            {hasNoContent && !loading && query && !error && (
                <NoResults query={query} />
            )}

            {error && (
                <ErrorMessage />
            )}

            {isAnEmpty && (
                <EmptySearch />
            )}
        </>
    );
};

export default PageSearchPresentation;