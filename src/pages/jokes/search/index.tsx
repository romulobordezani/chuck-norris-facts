import React, { FunctionComponent, ReactElement } from 'react';

import CustomHead from '../../../components/__shared/custom-head';
import { SearchContainer } from '../../../components/page-search';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import { IJoke, IQuery } from '@types';



export interface ISearchPageProps {
    initialResult?: IJoke[] | [],
    initialQuery?: IQuery,
    initialLucky?: boolean | null
}

export interface IEmptyProps {
    props: ISearchPageProps
}

const SearchPage: FunctionComponent<ISearchPageProps> = ({
    initialResult,
    initialQuery = '',
    initialLucky
}): ReactElement => {
    return (
        <>
            <CustomHead />
            <SearchContainer {...{
                initialResult,
                initialQuery,
                initialLucky
            }} />
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {

    const emptyProps: IEmptyProps = {
        props: {
            initialResult: [],
            initialQuery: context.query?.query || '',
            initialLucky: null
        }
    };

    try {
        const isAnEmptyQuery = !('query' in context?.query) || context?.query?.query === '';

        if (isAnEmptyQuery) {
            delete emptyProps?.props?.initialQuery;
            return emptyProps;
        }

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const isTheQueryTooShort = ('query' in context?.query && context?.query?.query?.length < 3);

        if (isTheQueryTooShort) {
            console.error('search.query: size must be between 3 and 120');
            return emptyProps;
        }

        const result = await axios.get(`${process.env.CHUCK_NORRIS_API_URL}/search?query=${context.query?.query}`);

        return {
            props: {
                initialResult: result?.data?.result,
                initialQuery: context.query?.query,
                initialLucky: context.query?.lucky || null
            }
        };
    } catch(error) {
        // TODO Replace with log4js, winston or whatever in production
        console.error(error);
        return emptyProps;
    }
};

export default SearchPage;
