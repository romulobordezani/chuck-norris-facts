import React, { Dispatch, FunctionComponent, forwardRef, ForwardedRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { IQuery } from '@types';

import styles from './style.module.scss';
import { createRipple } from '@utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  query: IQuery;
  setQuery: Dispatch<IQuery>;
}

type Ref = InputProps;

const InputSearch = React.forwardRef<HTMLInputElement, Ref>(
    ({ ...inputProps }: InputProps, ref: React.Ref<HTMLInputElement>) => {
    return (
        <div className={styles.searchBox}>
            <input
                type="search"
                value={inputProps.query}
                onChange={event => inputProps.setQuery(event.target.value)}
                className={styles.searchBox__input}
                placeholder="Search"
                minLength={3}
                maxLength={120}
                id="search-input"
                ref={ref}
            />
            <button
                type="submit"
                className={styles.searchBox__submit}
                role="button"
                onClick={createRipple}
            >
                Search
                <FontAwesomeIcon icon={faSearch} width={46} />
            </button>
        </div>
    );
});
export default InputSearch;