import React, { FunctionComponent } from 'react';

import styles from './style.module.scss';

const ErrorMessage: FunctionComponent = () => {
    return (
        <div className={styles.error} data-testid="error-message-component">
            <div className={styles.error__message}>
                ⚠️ Something went wrong.
            </div>
        </div>
    );
};

export default ErrorMessage;