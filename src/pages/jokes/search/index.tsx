import React, { FunctionComponent, ReactElement } from 'react';

import CustomHead from '../../../components/__shared/custom-head';
import { SearchContainer } from '../../../components/page-search';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import { IJoke, IQuery } from '@types';

export interface ISearchPageProps {
    initialResult?: IJoke[] | [],
    initialQuery?: IQuery,
    initialLucky?: boolean | null,
    initialTotal: number
}

export interface IEmptyProps {
    props: ISearchPageProps
}

const SearchPage: FunctionComponent<ISearchPageProps> = (props): ReactElement => {
    return (
        <>
            <CustomHead />
            <SearchContainer {...props} />
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {

    const emptyProps: IEmptyProps = {
        props: {
            initialResult: [],
            initialQuery: context.query?.query || '',
            initialLucky: null,
            initialTotal: 0
        }
    };

    try {
        const { query } = context;
        const isAnEmptyQuery = !('query' in query) || context?.query?.query === '';

        if (isAnEmptyQuery) {
            delete emptyProps?.props?.initialQuery;
            return emptyProps;
        }

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const isTheQueryTooShort = ('query' in query && query?.query?.length < 3);

        if (isTheQueryTooShort) {
            console.error('search.query: size must be between 3 and 120');
            return emptyProps;
        }

        const result = await axios.get(`${process.env.CHUCK_NORRIS_API_URL}/search?query=${context.query?.query}`, { timeout: 30000 });

        result.data.result = result.data.result.slice(0, 2500);

        return {
            props: {
                initialResult: result?.data?.result,
                initialQuery: context.query?.query,
                initialLucky: context.query?.lucky || null,
                initialTotal: result?.data?.total
            }
        };
    } catch(error) {
        // TODO Replace with log4js, winston or whatever in production
        console.error(error);
        return emptyProps;
    }
};

export default SearchPage;
