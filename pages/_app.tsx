import React from 'react';
import type { AppProps } from 'next/app';

import '../styles/globals.css';

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element =>
    // eslint-disable-next-line react/jsx-props-no-spreading -- Next.js needs to inject it's page props here using spread
   <Component {...pageProps} />
;

export default MyApp;