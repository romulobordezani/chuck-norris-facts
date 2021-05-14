import React, { Dispatch, FunctionComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { IQuery } from '@types';

import styles from './style.module.scss';

interface IInputSearch {
    query: IQuery;
    setQuery: Dispatch<IQuery>;
}

const InputSearch: FunctionComponent<IInputSearch> = ({ query, setQuery }) => {
    return (
        <div className={styles.searchBox}>
            {/* TODO - Would be nice to have an auto-complete here */}
            <input
                type="search"
                value={query}
                onChange={event => setQuery(event.target.value)}
                className={styles.searchBox__input}
                placeholder="Search"
                minLength={3}
                maxLength={120}
            />
            <button
                type="submit"
                className={styles.searchBox__submit}
                role="button"
            >
                Search
                <FontAwesomeIcon icon={faSearch} width={26} />
            </button>
        </div>
    );
};
export default InputSearch;