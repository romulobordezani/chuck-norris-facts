import React, { FunctionComponent } from 'react';
import { SearchBoxContainer } from '../search-box';
import styles from './style.module.scss';
import { ISearchPageProps } from '../../../pages/jokes/search';

const Header: FunctionComponent<ISearchPageProps> = ({
     initialResult,
     initialQuery,
     initialLucky
}) => {
    return (
        <header className={styles.header}>
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