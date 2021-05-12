import React, { FunctionComponent, ReactElement } from 'react';

import styles from './style.module.scss';

const EmptySearch: FunctionComponent = (): ReactElement => (
    <div className={styles.results}>
        <h3>N<span className={styles.results__amount}>0</span> results found.</h3>
        <div className={styles.results__joke}>
            Only Chuck Norris can get results while searching for nothing. 🤠
        </div>
    </div>
);

export default EmptySearch;