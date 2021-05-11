import React, { FunctionComponent, ReactElement } from 'react';

import styles from './style.module.scss';

interface INoResultsProps {
    query: string | string[];
}

const NoResults: FunctionComponent<INoResultsProps> = ({ query }): ReactElement => (
    <div>
        Probably Chuck Norris did something related to {' '}
        <strong className={styles.highlight}>{query}</strong>,
        {' '}but in secret.
    </div>
)

export default NoResults;