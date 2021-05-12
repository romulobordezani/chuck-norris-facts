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
    return (
        <div className={styles.results}>
            <h3>
                About <span className={styles.results__amount}>{result?.length}</span> {isALucky && 'lucky '} results
            </h3>
            {result.map(joke => (
                <JokeWithLink
                    key={joke.id}
                    joke={joke}
                    query={query}
                />
            ))}
        </div>
    );
};

export default Results;