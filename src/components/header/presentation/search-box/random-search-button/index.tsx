import React, { FunctionComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSkullCrossbones } from '@fortawesome/free-solid-svg-icons';

import styles from './style.module.scss';

const RandomSearchButton: FunctionComponent = () => {
    return (
        <button className={styles.randomSearchButton} >
            <FontAwesomeIcon icon={faSkullCrossbones} width={16} />{'  '}
            Russian roulette
        </button>
    );
};

export default RandomSearchButton;