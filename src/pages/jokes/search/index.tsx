import React, { FunctionComponent, ReactElement } from 'react';

import CustomHead from '../../../components/__shared/custom-head';
import { SearchContainer } from '../../../components/page-search';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import { IJoke, IQuery } from '@types';

export interface ISearchPageProps {
    initialResult?: IJoke[] | [],
    initialQuery?: IQuery,
    initialLucky?: boolean
}

const SearchPage: FunctionComponent<ISearchPageProps> = ({
    initialResult,
    initialQuery,
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
    try {

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const isTheQueryTooShort = ('query' in context?.query && context?.query?.query?.length < 3);

        if (isTheQueryTooShort) {
            throw new Error('search.query: size must be between 3 and 120');
        }

        const result = await axios.get(`${process.env.CHUCK_NORRIS_API_URL}/search?query=${context.query?.query}`);

        return {
            props: {
                initialResult: result?.data?.result || [],
                initialQuery: context.query?.query || '',
                initialLucky: context.query?.lucky || null
            }
        };
    } catch(error) {
        // TODO Replace with log4js, winston or whatever
        console.error(error);
        return {
            props: {
                initialResult: [],
                initialQuery: context.query?.query || '',
                initialLucky: null
            }
        };
    }
};

export default SearchPage;
