import React, { FunctionComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { IQuery } from '@types';

import styles from './style.module.scss';

interface IInputSearch {
    query: IQuery;
    setQuery(query: IQuery): void;
}

const InputSearch: FunctionComponent<IInputSearch> = ({ query, setQuery }) => {
    return (
        <div className={styles.searchBox}>
            <input
                type="search"
                value={query}
                onChange={event => setQuery(event.target.value)}
                className={styles.searchBox__input}
                placeholder="Search"
            />
            <button
                type="submit"
                className={styles.searchBox__submit}
            >
                <FontAwesomeIcon icon={faSearch} width={16} />
            </button>
        </div>
    );
};
export default InputSearch;