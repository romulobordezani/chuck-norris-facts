import React, { FunctionComponent } from 'react';
import { IJoke, IQuery } from '@types';
import styles from './style.module.scss';

interface IJokeWithLinkProps {
    joke: IJoke | null;
    query?: IQuery;
}

const JokeWithLink: FunctionComponent<IJokeWithLinkProps> = ({ joke }) => {
    return (
        <div className={styles.joke}>
            <div className={styles.joke__fakeLink}>
                {joke?.value}
            </div>
        </div>
    );
};

export default JokeWithLink;