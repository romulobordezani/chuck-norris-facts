import { FunctionComponent } from 'react';
import SearchBox from './search-box';

import styles from './style.module.scss';
import { IQuery } from '../../../../types';
import { ISearchForJokes } from '../../../page-search/action-creators';

interface IHeaderProps {
    fetch: ISearchForJokes;
    initialQuery?: IQuery
}

const Header: FunctionComponent<IHeaderProps> = ({ fetch, initialQuery }) => {
    return (
        <header className={styles.header}>
            <div className={styles.header__searchBox}>
                <SearchBox {...{ fetch, initialQuery }} />
            </div>
        </header>
    );
};

export default Header;