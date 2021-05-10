import React, { FunctionComponent, ReactElement } from 'react';
import Head from 'next/head';

const DEFAULT_TITLE = 'Chuck Norris Facts';

interface ICustomHead {
    title?: string
}

// TODO - Add Open Graph meta-tags to allow sharing on social media, after receiving API data
const CustomHead: FunctionComponent<ICustomHead> = ({ title = DEFAULT_TITLE  }): ReactElement => (
    <Head>
        <title>{title}</title>
        <meta name="description" content="Chuck Norris Facts" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Karla:ital,wght@0,400;1,200&display=swap" rel="stylesheet" />
    </Head>
);

export default CustomHead;
export { DEFAULT_TITLE };