import React, { FunctionComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHatCowboy  } from '@fortawesome/free-solid-svg-icons';

import styles from './style.module.scss';
import { createRipple } from '@utils';

export interface IRandomSearchButton {
    handleLuckySubmit(): void;
}

const RandomSearchButton: FunctionComponent<IRandomSearchButton> = ({ handleLuckySubmit }) => {
    return (
        <button
            className={styles.randomSearchButton}
            onClick={e => {
                createRipple(e);
                handleLuckySubmit();
            } }
            type="button"
            role="button"
        >
            <FontAwesomeIcon icon={faHatCowboy} width={26} />{'  '}
            LUCKY
        </button>
    );
};

export default RandomSearchButton;