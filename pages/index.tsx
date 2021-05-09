import React, { FormEvent, FunctionComponent, useState } from 'react';
import { IJoke } from '@types';
import axios from 'axios';

import CustomHead from '../components/__shared/custom-head';
import Search from '../components/search';
import Results from '../components/results';

const HomePage: FunctionComponent = () => {
    const [query, setQuery] = useState('');
    const [result, setResult] = useState<IJoke[]>([]);

    //  TODO - Add useCallback to memoize this async result
    //  MAYBE - To use Redux? Too small for this?
    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        try {
            const result = await axios.get(`/api/chuck-norris-facts/jokes/search`, { params: { query } });
            setResult(result?.data?.result);
        } catch(error) {
            console.error(error);
        }
    }

    return (
        <>
            <CustomHead />
            <Search
                setQuery={setQuery}
                handleSubmit={handleSubmit}
                query={query}
            />
            <Results result={result}/>
        </>
    )

  };

export default HomePage;
