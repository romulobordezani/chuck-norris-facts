import React, { FunctionComponent } from 'react';
import { IJoke } from '@types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faWhatsapp, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faShareAlt, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { shareAction } from '@utils';

import styles from './style.module.scss';

interface IJokeSocialsProps {
    joke: IJoke | null;
    host?: string;
}

const JokeSocials: FunctionComponent<IJokeSocialsProps> = ({
    joke,
    host
}) => {
    const jokeURL = `${host}/jokes/${joke?.id}`;

    return (
        <div className={styles.joke}>
            <div className={styles.joke__text}>
                <div className={styles.joke__text__backButton}>
                    <a
                        title="Back"
                        href="#"
                        onClick={/* istanbul ignore next */() => {
                            history.back();
                        }}
                    >
                        <FontAwesomeIcon icon={faArrowLeft} width={26} /> Share on Twitter
                    </a>
                </div>
                {joke?.value}
            </div>
            <div className={styles.joke__socials}>
                <div className={styles.joke__socials__twitterButton}>
                    <a
                        title="Share on Twitter"
                        href={`https://twitter.com/intent/tweet?text=${jokeURL}`}
                        target="_BLANK"
                        rel="noreferrer"
                    >
                        <FontAwesomeIcon icon={faTwitter} width={26} /> Share on Twitter
                    </a>
                </div>
                <div className={styles.joke__socials__whatsappButton}>
                    <a
                        title="Share on Whatsapp"
                        href={`https://api.whatsapp.com/send?text=${jokeURL}`}
                        target="_BLANK"
                        rel="noreferrer"
                    >
                        <FontAwesomeIcon icon={faWhatsapp} width={26} /> Share on Whatsapp
                    </a>
                </div>
                <div className={styles.joke__socials__facebookButton}>
                    <a
                        title="Share on Facebook"
                        href={`https://www.facebook.com/sharer/sharer.php?u=${jokeURL}`}
                        target="_BLANK"
                        rel="noreferrer"
                    >
                        <FontAwesomeIcon icon={faFacebook} width={26} /> Share on Whatsapp
                    </a>
                </div>
                <div className={styles.joke__socials__shareButton}>
                    <a
                        href="#"
                        title="Share"
                        onClick={/* istanbul ignore next */ () => {
                                shareAction({
                                    title: 'Norris Did',
                                    url: jokeURL,
                                    text: joke?.value
                                });
                            }
                        }
                    >
                        <FontAwesomeIcon icon={faShareAlt} width={26} /> Share
                    </a>
                </div>               
            </div>
        </div>
    );
};

export default JokeSocials;