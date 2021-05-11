import React, { FunctionComponent } from 'react';
import Link from 'next/link';
import { IJoke } from '../../types';

import styles from './style.module.scss';

interface IJokeProps {
    joke: IJoke | null;
    query?: string | string[] | undefined;
}

const highLight = (
    jokeString: string | undefined = '',
    query: string | string[] | undefined = ''
) => {
    if(query) {
        return {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore -- RegExp doesn't allow union types, used in query: string | string[]
            __html: jokeString.replace(new RegExp(query, "gi"), (match) => `<mark>${match}</mark>`)
        };
    }

    return { __html: jokeString };
}

const Joke: FunctionComponent<IJokeProps> = ({ joke, query }) => {
    return (
        <div className={styles.joke}>
            <div  />
            <Link href={`/jokes/${joke?.id}`} >
                <a dangerouslySetInnerHTML={highLight(joke?.value, query)} />
            </Link>
        </div>
    );
}

export default Joke;