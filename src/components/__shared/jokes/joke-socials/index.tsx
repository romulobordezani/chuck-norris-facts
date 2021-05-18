import React, { FunctionComponent } from 'react';
import { IJoke } from '@types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faWhatsapp, faFacebook } from '@fortawesome/free-brands-svg-icons';

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
            <div className={styles.joke__text}>
                {joke?.value}
            </div>
            <div className={styles.joke__socials}>
                <div className={styles.joke__socials__twitterButton}>
                    <a
                        title="Share on Twitter"
                        href={`https://twitter.com/intent/tweet?text=${host}/jokes/${joke?.id}`}
                        target="_BLANK"
                        rel="noreferrer"
                    >
                        <FontAwesomeIcon icon={faTwitter} width={26} /> Share on Twitter
                    </a>
                </div>
                <div className={styles.joke__socials__whatsappButton}>
                    <a
                        title="Share on Whatsapp"
                        href={`https://api.whatsapp.com/send?text=${host}/jokes/${joke?.id}`}
                        target="_BLANK"
                        rel="noreferrer"
                    >
                        <FontAwesomeIcon icon={faWhatsapp} width={26} /> Share on Whatsapp
                    </a>
                </div>
                <div className={styles.joke__socials__facebookButton}>
                    <a
                        title="Share on Facebook"
                        href={`https://www.facebook.com/sharer/sharer.php?u=${host}/jokes/${joke?.id}`}
                        target="_BLANK"
                        rel="noreferrer"
                    >
                        <FontAwesomeIcon icon={faFacebook} width={26} /> Share on Whatsapp
                    </a>
                </div>
            </div>
        </div>
    );
};

export default JokeSocials;