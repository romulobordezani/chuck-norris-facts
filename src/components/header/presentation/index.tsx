import { FunctionComponent } from 'react';
import SearchBox from './search-box';

import styles from './style.module.scss';
import { IQuery } from '../../../types';

interface IHeaderProps {
    fetch(query: IQuery): void;
    initialQuery?: IQuery
}

const Header: FunctionComponent<IHeaderProps> = ({ fetch, initialQuery }) => {
    return (
        <header className={styles.header}>
            <SearchBox {...{ fetch, initialQuery }} />
        </header>
    );
};

export default Header;