import React, { FunctionComponent, ReactElement } from 'react';

import styles from './style.module.scss';

const InitialResult: FunctionComponent = (): ReactElement => {
    return (
        <div className={styles.initialResults} />
    );
};

export default InitialResult;