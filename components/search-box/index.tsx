import React, { FormEvent, FunctionComponent, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

import styles from './style.module.scss';

interface ISearchProps {
    fetch(query: string | string[]): void;
    initialQuery?: string | string[]
}

const Search: FunctionComponent<ISearchProps> = ({ fetch, initialQuery = '' }) => {
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
        <div className={styles.search}>

            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="search"
                        value={query}
                        onChange={event => setQuery(event.target.value)}
                        className={styles.search__input}
                        placeholder="Search..."
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        className={styles.search__submit}
                    >
                        <FontAwesomeIcon icon={faSearch} width={13} />
                    </button>
                    <button className={styles.search__lucky} >
                        I&apos;m feeling lucky
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Search;