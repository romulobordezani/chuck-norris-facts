import React, { FunctionComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHatCowboy  } from '@fortawesome/free-solid-svg-icons';

import styles from './style.module.scss';

export interface IRandomSearchButton {
    handleLuckySubmit(): void;
}

const RandomSearchButton: FunctionComponent<IRandomSearchButton> = ({ handleLuckySubmit }) => {
    return (
        <button
            className={styles.randomSearchButton}
            onClick={() => { handleLuckySubmit(); } }
            type="button"
            role="button"
        >
            <FontAwesomeIcon icon={faHatCowboy} width={26} />{'  '}
            LUCKY
        </button>
    );
};

export default RandomSearchButton;