import React, { FormEvent, FunctionComponent, useState, useEffect } from 'react';

import styles from './style.module.scss';
import { IQuery } from '../../../../types';
import RandomSearchButton from './random-search-button';
import InputSearch from './input-search';

interface ISearchBoxProps {
    fetch(query: IQuery): void;
    initialQuery?: IQuery
}

const SearchBox: FunctionComponent<ISearchBoxProps> = ({ fetch, initialQuery = '' }) => {
    const [query, setQuery] = useState(initialQuery);

    const handleSubmit = (event: FormEvent): void => {
        event.preventDefault();

        const isTheQueryFullFilled = query !== null && query !== '';

        if (isTheQueryFullFilled) {
            fetch(query);
        }
    };

    useEffect(() => {
        setQuery(initialQuery);
    }, [initialQuery]);

    return (
        <div className={styles.searchBox}>
            <form
                onSubmit={handleSubmit}
                className={styles.searchBox}
            >
                <div className={styles.searchBox__box}>
                    <InputSearch {...{ query, setQuery }} />
                </div>
                <div className={styles.search__extraButtons}>
                    <RandomSearchButton />
                </div>
            </form>
        </div>
    );
}

export default SearchBox;