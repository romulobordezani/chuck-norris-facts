import React, { FunctionComponent } from 'react';
import { IJoke } from '@types';

import Joke from '../joke';
import styles from './style.module.scss';

interface IResultProps {
    result: IJoke[];
    query: string | string[];
}

const Results: FunctionComponent<IResultProps> = ({ result, query }) => {
    return (
        <div className={styles.results}>
            {result.map(joke => (
                <Joke
                    key={joke.id}
                    joke={joke}
                    query={query}
                />
            ))}
        </div>
    )
}

export default Results;