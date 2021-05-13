import React from 'react';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import axios from 'axios';
import store from '../store';

axios.defaults.baseURL = process.env.CHUCK_NORRIS_API_URL;

import '../styles/normalize.scss';
import '../styles/globals.scss';
import '../styles/animated-loading.scss';


const ChuckNorrisApp = ({ Component, pageProps }: AppProps): JSX.Element => {
    return (
        <Provider store={store}>
            { /* eslint-disable-next-line react/jsx-props-no-spreading -- Next.js needs this spread */}
            <Component {...pageProps} />
        </Provider>
    );
};

export default ChuckNorrisApp;
