import React, { FormEvent, FunctionComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSkullCrossbones } from '@fortawesome/free-solid-svg-icons';

import styles from './style.module.scss';

export interface IRandomSearchButton {
    handleSubmit(event?: FormEvent, luck?: boolean);
}

const RandomSearchButton: FunctionComponent<IRandomSearchButton> = ({ handleSubmit }) => {
    return (
        <button
            className={styles.randomSearchButton}
            onClick={() => {handleSubmit(null, true)} }
            type="button"
        >
            <FontAwesomeIcon icon={faSkullCrossbones} width={16} />{'  '}
            Russian roulette
        </button>
    );
};

export default RandomSearchButton;