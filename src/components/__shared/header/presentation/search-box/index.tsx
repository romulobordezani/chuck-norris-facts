import React, { FormEvent, FunctionComponent, useState, useEffect } from 'react';

import styles from './style.module.scss';
import { IQuery } from '../../../../../types';
import RandomSearchButton from './random-search-button';
import InputSearch from './input-search';
import { ISearchForJokes } from '../../../../page-search/action-creators';

interface ISearchBoxProps {
    fetch: ISearchForJokes;
    initialQuery?: IQuery;
}

const SearchBox: FunctionComponent<ISearchBoxProps> = ({ fetch, initialQuery = '' }) => {
    const [query, setQuery] = useState(initialQuery);

    const handleSubmit = (event?: FormEvent, luck?: boolean): void => {
        event?.preventDefault();
        fetch(query, luck);
    };

    useEffect(() => {
        setQuery(initialQuery);
    }, [initialQuery]);

    return (
        <form
            onSubmit={handleSubmit}
            className={styles.searchBox}
        >
            <div className={styles.searchBox__input}>
                <InputSearch {...{ query, setQuery }} />
            </div>
            <div className={styles.searchBox__buttons}>
                <RandomSearchButton {...{ handleSubmit }} />
            </div>
        </form>
    );
}

export default SearchBox;