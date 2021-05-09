import React, { FormEvent, FunctionComponent } from 'react';

interface ISearchProps {
    handleSubmit(event: FormEvent): void;
    query: string;
    setQuery(value: string): void
}

const Search: FunctionComponent<ISearchProps> = ({ handleSubmit, query, setQuery }) => {
    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="search" value={query} onChange={event => setQuery(event.target.value)} />
                <button type="submit">Pesquisar</button>
            </form>

        </>
    );
}

export default Search;