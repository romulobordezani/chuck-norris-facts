import React, { Dispatch, FormEvent, FunctionComponent, InputHTMLAttributes } from 'react';

import styles from './style.module.scss';
import { IQuery } from '@types';
import RandomSearchButton from './random-search-button';
import InputSearch, { InputProps } from './input-search';

interface ISearchBoxPresentationProps {
    handleSubmit: (event: FormEvent) => void;
    handleLuckySubmit: () => void;
    query: IQuery;
    setQuery: Dispatch<IQuery>;
    inputEl: InputHTMLAttributes<HTMLInputElement>;
}

const SearchBoxPresentation: FunctionComponent<ISearchBoxPresentationProps> = ({
   handleSubmit,
   query,
   setQuery,
   handleLuckySubmit,
   inputEl
}) => {
    return (
        <form
            onSubmit={handleSubmit}
            className={styles.searchBox}
        >
            <div className={styles.searchBox__input}>
                <InputSearch {...{ query, setQuery }} ref={inputEl as any} />
            </div>
            <div className={styles.searchBox__buttons}>
                <RandomSearchButton {...{ handleLuckySubmit }} />
            </div>
        </form>
    );
};

export default SearchBoxPresentation;