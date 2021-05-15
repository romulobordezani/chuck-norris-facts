import React, { FunctionComponent, ReactElement } from 'react';

import styles from './style.module.scss';

interface INoResultsProps {
    query: string | string[];
}

const NoResults: FunctionComponent<INoResultsProps> = ({ query }): ReactElement => (
    <div className={styles.results} data-testid="no-result-component">
        <h3>N<span className={styles.results__amount}>0</span> results found.</h3>
        <div className={styles.results__joke}>
            Probably Chuck Norris did something related to {' '}
            <strong className={styles.results__joke_m_highlight}>{query}</strong>,
            {' '}but in secret. 🤠
        </div>
    </div>
);

export default NoResults;