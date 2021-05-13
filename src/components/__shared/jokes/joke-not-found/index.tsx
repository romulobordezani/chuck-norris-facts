import React, { FunctionComponent } from 'react';
import styles from '../joke-socials/style.module.scss';

const JokeNotFound: FunctionComponent = () => {
    return (
        <div className={styles.joke}>
            <div className={styles.joke__text}>
                <div><strong>404</strong></div>
                <div>Chuck Norris never did that! But he will! </div>
            </div>
        </div>
    );
};

export default JokeNotFound;