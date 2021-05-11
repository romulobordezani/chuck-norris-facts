import React, { FunctionComponent } from 'react';
import { IJoke, IQuery } from '@types';

import Joke from '../../__shared/joke';
import ChuckAintAccomplishedItYet from '../../page-search/presentation/not-found-joke';
import Header from '../../__shared/header/presentation';
import styles from './style.module.scss';

export interface IPageJokePresentation {
    fetch(query: IQuery);
    joke: IJoke;
    host: string;
}

const PageJokePresentation: FunctionComponent<IPageJokePresentation> = ({ fetch, joke, host }) => {
    return (
        <>
            <Header fetch={fetch} />
            {joke && (
                <div className={styles.jokeContainer}>
                    <Joke {...{ joke, host }} />
                </div>
            )}
            {!joke && (
                <ChuckAintAccomplishedItYet />
            )}
        </>
    )
}

export default PageJokePresentation;