import React, { FunctionComponent } from 'react';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import { IJoke } from '@types';

import CustomHead from '../../components/__shared/custom-head';
import Joke from '../../components/joke';
import ChuckAintAccomplishedItYet from '../../components/not-found-joke';
import Search from '../../components/search-box';
import { useRouter } from 'next/router';

interface IJokePageProps {
    joke: IJoke
}

const JokePage: FunctionComponent<IJokePageProps> = ({ joke }) => {
    const router = useRouter();

    const fetch = async (query: string | string[]) => {
        try {
            await router.push(`/search?query=${query}`);
        } catch(error) {
            console.error(error);
        }
    }

    return (
        <>
            <CustomHead />
            <Search fetch={fetch} />
            {joke && (
                <Joke joke={joke}/>
            )}

            {!joke && (
                <ChuckAintAccomplishedItYet />
            )}
        </>
    )
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        const result = await axios.get(`${process.env.CHUCK_NORRIS_API_URL}/${context.params?.id}`);
        return { props: { joke: result.data } };
    } catch(error) {
        // TODO Replace with log4js or whatever
        console.error(error);
        return { props: { joke: null } };
    }
}

export default JokePage;
