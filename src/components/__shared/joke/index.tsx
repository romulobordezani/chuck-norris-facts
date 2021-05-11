import React, { FunctionComponent } from 'react';
import Link from 'next/link';
import { IJoke, IQuery } from '@types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';


import styles from './style.module.scss';

interface IJokeProps {
    joke: IJoke | null;
    query?: IQuery;
    host?: string;
}

const highLight = (
    jokeString: string | undefined = '',
    query: IQuery = ''
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

const Joke: FunctionComponent<IJokeProps> = ({ joke, query, host }) => {
    return (
        <div className={`${styles.joke} ${ host ? styles.self : ''}`}>
            {!host && (
                <Link href={`/jokes/${joke?.id}`}>
                    <a dangerouslySetInnerHTML={highLight(joke?.value, query)} />
                </Link>
            )}

            {host && (
                <>
                    <div>{joke?.value}</div>
                    <a
                        href={`https://twitter.com/intent/tweet?text=http://${host}/jokes/${joke.id}`}
                        target="_BLANK"
                        rel="noreferrer"
                        className={styles.joke__twitterButton}
                    >
                        <FontAwesomeIcon icon={faTwitter} width={26} /> Share on Twitter
                    </a>
                </>
            )}
        </div>
    );
}

export default Joke;