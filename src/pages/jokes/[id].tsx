import React, { FunctionComponent } from 'react';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import { IJoke } from '@types';
import CustomHead from '../../components/__shared/custom-head';
import { PageJokeContainer } from '../../components/page-joke';
import { CLOUDFRONT_DOMAIN } from '../../components/__shared/constants';

interface IJokePageProps {
    joke: IJoke | null;
    host: string;
}

const JokePage: FunctionComponent<IJokePageProps> = ({ joke, host }) => {
    return (
        <>
            <CustomHead {...{ joke, host }} />
            <PageJokeContainer {...{ joke, host }} />
        </>
    );
};

/**
 * IMPORTANT NOTE:
 * Pre-fetches the IJoke before Redux on Client Side because of the Open Graphs MetaTags on `Server Side Rendering`,
 * used to share the jokes in Social Media, WhatsApp, and so on.
*/
export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        const result = await axios.get(`${process.env.CHUCK_NORRIS_API_URL}/${context.params?.id}`);
        return { props: { joke: result.data, host: CLOUDFRONT_DOMAIN } };
    } catch(error) {
        // TODO Replace with log4js or whatever in production
        console.error(error);
        return { props: { joke: null, host: CLOUDFRONT_DOMAIN } };
    }
};

export default JokePage;
