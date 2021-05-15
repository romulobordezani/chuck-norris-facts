import React, { FunctionComponent, ReactElement } from 'react';

import style from './style.module.scss';

const Loading: FunctionComponent = (): ReactElement => (
    <div className={style.loading} data-testid="loading-component">
        <div className={style.loading__icon}>
            <div className="loader">
                <div className="inner" />
            </div>
        </div>
        <div className={style.loading__disclaimer}>
            <div className={style.loading__disclaimer__title}>
                <span className={style.loading__disclaimer__title__emojis}>⚠️</span>
                BE AWARE!
                <span className={style.loading__disclaimer__title__emojis}>⚠️</span>
            </div>
            <div className={style.loading__disclaimer__message}>
                Chuck Norris never re<strong>loads</strong>.
            </div>
        </div>
    </div>
);

export default Loading;