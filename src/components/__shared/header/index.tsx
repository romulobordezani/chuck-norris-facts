import React, { FunctionComponent } from 'react';
import { SearchBoxContainer } from '../search-box';
import styles from './style.module.scss';
import { ISearchPageProps } from '../../../pages/jokes/search';

export interface IHeaderProps extends ISearchPageProps{
    resetState(): void;
}

const Header: FunctionComponent<IHeaderProps> = ({
     initialResult,
     initialQuery,
     initialLucky,
     resetState
}) => {
    return (
        <header className={styles.header} data-testid="header-component">
            <div
                className={styles.header__home}
                role="button"
                onClick={resetState}
                data-testid="home-button"
            />
            <div className={styles.header__searchBox}>
                <SearchBoxContainer {...{
                    initialResult,
                    initialQuery,
                    initialLucky
                }} />
            </div>
        </header>
    );
};

export default Header;