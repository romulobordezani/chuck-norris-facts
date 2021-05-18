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
            <meta name="description" content="Norris Did"/>
            <meta name="keywords" content="Chuck, Norris, Facts, API, React, Next.js" />

            <link rel="manifest" href="/manifest.json" />
            <link
                href="/icons/favicon-16x16.png"
                rel="icon"
                type="image/png"
                sizes="16x16"
            />
            <link
                href="/icons/favicon-32x32.png"
                rel="icon"
                type="image/png"
                sizes="32x32"
            />
            <link rel="apple-touch-icon" href="/apple-icon.png"></link>
            <meta name="theme-color" content="#ff8360" />
            <meta name="viewport" content="width=device-width" />

            {joke && (
                <>
                    <meta property="og:title" content={title}/>
                    <meta property="og:description" content={joke?.value} data-testid="og-meta"/>
                    <meta property="og:type" content="website"/>
                    <meta property="og:url" content={`${host}/jokes/${joke?.id}`} />
                    <meta property="og:image" itemProp="image" content={`${host}/icons/icon-512x512.png`}/>
                    <meta property="og:site_name" content="Norris Did" />
                    <meta property="og:description" content={joke?.value} />
                    <meta property="og:type" content="website" />
                    <meta property="og:updated_time" content="1440432930" />
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