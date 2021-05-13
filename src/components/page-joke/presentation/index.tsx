import React, { FunctionComponent, ReactElement } from 'react';
import { IJoke } from '@types';

import JokeSocials from '../../__shared/jokes/joke-socials';
import JokeNotFound from '../../__shared/jokes/joke-not-found';
import Header from '../../__shared/header';
import styles from './style.module.scss';

export interface IPageJokePresentation {
    joke: IJoke | null;
    host?: string;
}

const PageJokePresentation: FunctionComponent<IPageJokePresentation> = ({
    joke,
    host
}): ReactElement => {
    return (
        <>
            <Header initialQuery="" />
            {joke && (
                <div className={styles.jokeContainer}>
                    <JokeSocials {...{ joke, host }} />
                </div>
            )}
            {!joke && (
                <div className={styles.jokeContainer}>
                    <JokeNotFound />
                </div>
            )}
        </>
    );
};

export default PageJokePresentation;