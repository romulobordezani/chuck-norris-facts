import React, { FunctionComponent, ReactElement } from 'react';
import Header from '../../__shared/header/presentation';
import Loading from '../../__shared/loading';
import Results from './results';
import NoResults from './no-results';
import { IJoke, IQuery } from '@types';

interface IPageSearchPresentationProps {
    fetch(query: IQuery),
    currentQuery: IQuery;
    loading: boolean;
    data: IJoke[];
    hasContent: boolean;
    hasNoContent: boolean;
    error: boolean;
}

const PageSearchPresentation: FunctionComponent<IPageSearchPresentationProps> = (
    {
        fetch,
        currentQuery,
        loading,
        data,
        hasContent,
        hasNoContent
    }): ReactElement => {
    return (
        <>
            <Header
                fetch={fetch}
                initialQuery={currentQuery}
            />
            {loading && (
                <Loading />
            )}
            {hasContent && !loading && (
                <Results result={data} query={currentQuery} />
            )}
            {hasNoContent && !loading && currentQuery &&(
                <NoResults query={currentQuery} />
            )}
        </>
    );
}

export default PageSearchPresentation;