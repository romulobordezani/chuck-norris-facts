import React, {FunctionComponent, ReactElement} from 'react';
import Head from 'next/head';

const DEFAULT_TITLE = 'Chuck Norris Facts';

interface ICustomHead {
    title?: string
}

const CustomHead: FunctionComponent<ICustomHead> = ({ title = DEFAULT_TITLE  }): ReactElement => (
    <Head>
        <title>{title}</title>
        <meta name="description" content="Chuck Norris Facts" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
    </Head>
);

export default CustomHead;
export { DEFAULT_TITLE };