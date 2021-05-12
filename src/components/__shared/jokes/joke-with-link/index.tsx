import React, { FunctionComponent } from 'react';
import Link from 'next/link';
import { IJoke, IQuery } from '@types';
import { highLight } from '@utils';
import styles from './style.module.scss';

interface IJokeWithLinkProps {
    joke: IJoke | null;
    query?: IQuery;
}

const JokeWithLink: FunctionComponent<IJokeWithLinkProps> = ({
    joke,
    query
}) => {
    return (
        <div className={styles.joke}>
            <Link href={`/jokes/${joke?.id}`}>
                <a dangerouslySetInnerHTML={highLight(joke?.value, query)} />
            </Link>
        </div>
    );
};

export default JokeWithLink;