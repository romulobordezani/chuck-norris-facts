import React, { FunctionComponent, FormEvent, useState } from 'react';
import axios from 'axios';
import { IFact } from '@types';

const Search: FunctionComponent = () => {
    const [query, setQuery] = useState('');
    const [result, setResult] = useState<IFact[]>([]);

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        try {
            const result = await axios.get(`/api/chuck-norris-facts/search`, { params: { query } });
            setResult(result?.data?.result);
        } catch(error) {
            console.error(error);
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="search" value={query} onChange={event => setQuery(event.target.value)} />
                <button type="submit">Pesquisar</button>
            </form>
            <div>
                {result.map(fact => (
                    <div key={fact.id}>
                        <div>{fact.value}</div>
                        <hr />
                    </div>
                ))}
            </div>
        </>
    );
}

export default Search;