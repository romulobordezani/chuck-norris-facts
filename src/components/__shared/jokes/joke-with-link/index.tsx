import React, { FunctionComponent } from 'react';
import Link from 'next/link';
import { IJoke, IQuery } from '@types';
import { highLight, createRipple } from '@utils';
import styles from './style.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare } from '@fortawesome/free-solid-svg-icons';

interface IJokeWithLinkProps {
    joke: IJoke | null;
    query?: IQuery;
}

const JokeWithLink: FunctionComponent<IJokeWithLinkProps> = ({
    joke,
    query
}) => {
    return (
        <div className={styles.joke} onClick={createRipple}>
            <div className={styles.joke__link}>
                <Link href={`/jokes/${joke?.id}`}>
                    <a dangerouslySetInnerHTML={highLight(joke?.value, query)} />
                </Link>
            </div>
            <div className={styles.joke__icon}>
                <Link href={`/jokes/${joke?.id}`}>
                    <a>
                        <FontAwesomeIcon title="Share" href={`/jokes/${joke?.id}`} icon={faShare} width={20} />
                    </a>
                </Link>
            </div>
        </div>
    );
};

export default JokeWithLink;