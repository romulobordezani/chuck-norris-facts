import React, { FunctionComponent, ReactElement } from 'react';
import Head from 'next/head';
import { IJoke } from '@types';

const DEFAULT_TITLE = 'Norris Did...';

interface ICustomHead {
    title?: string;
    joke?: IJoke | null;
    host?: string;
}

const CustomHead: FunctionComponent<ICustomHead> = ({ title = DEFAULT_TITLE, joke, host }): ReactElement => {
    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content="Chuck Norris Facts"/>

            <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png" />
            <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png" />
            <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png" />
            <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png" />
            <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png" />
            <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png" />
            <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png" />
            <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png" />
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png" />
            <link rel="icon" type="image/png" sizes="192x192"  href="/android-icon-192x192.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
            <link rel="manifest" href="/manifest.json" />
            <meta name="msapplication-TileColor" content="#ffffff" />
            <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
            <meta name="theme-color" content="#ffffff" />

            <meta name="viewport" content="width=device-width,user-scalable=no" />

            {joke && (
                <>
                    <meta property="og:title" content={title}/>
                    <meta property="og:description" content={joke?.value} data-testid="og-meta"/>
                    <meta property="og:type" content="website"/>
                    <meta property="og:url" content={`${host}/jokes/search/${joke?.id}`} />
                    <meta property="og:image" content={`${host}/android-chrome-512x512.png`}/>
                </>
            )}

            <link rel="preconnect" href="https://fonts.gstatic.com"/>
            <link
                href="https://fonts.googleapis.com/css2?family=Karla:ital,wght@0,400;1,200&display=swap"
                rel="stylesheet"
            />
        </Head>
    );
};

export default CustomHead;
export { DEFAULT_TITLE };