import React, { FunctionComponent } from 'react';
import { IJoke, IQuery } from '@types';

import styles from './style.module.scss';
import JokeWithLink from '../../../__shared/jokes/joke-with-link';

interface IResultProps {
    result: IJoke[];
    query: IQuery;
    isALucky: boolean;
}

const Results: FunctionComponent<IResultProps> = ({
      result,
      query ,
      isALucky
}) => {
    const total = result?.length;

    return (
        <div className={styles.results} data-testid="results-component">
            {isALucky && (
                <h3>
                    Just <span className={styles.results__amount}>a lucky</span> result.
                </h3>
            )}

            {!isALucky && (
                <h3>
                    About <span className={styles.results__amount}>{total}</span> results.
                </h3>
            )}

            {result.map(joke => (
                <JokeWithLink
                    key={joke?.id}
                    joke={joke}
                    query={query}
                />
            ))}

            { /* TODO - Missing a pagination Here, when we got too much results, page goes slow */ }
        </div>
    );
};

export default Results;