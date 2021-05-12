import React, { FunctionComponent } from 'react';
import { IJoke } from '@types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';

import styles from './style.module.scss';

interface IJokeSocialsProps {
    joke: IJoke | null;
    host?: string;
}

const JokeSocials: FunctionComponent<IJokeSocialsProps> = ({
    joke,
    host
}) => {
    return (
        <div className={styles.joke}>
            <>
                <div className={styles.joke__text}>
                    {joke?.value}
                </div>
                <div className={styles.joke__twitterButton}>
                    <a
                        href={`https://twitter.com/intent/tweet?text=http://${host}/jokes/${joke?.id}`}
                        target="_BLANK"
                        rel="noreferrer"
                    >
                        <FontAwesomeIcon icon={faTwitter} width={26} /> Share on Twitter
                    </a>
                </div>
            </>
        </div>
    );
};

export default JokeSocials;