import React, { FunctionComponent, useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { IJoke } from '@types';

import CustomHead from '../../components/custom-head';
import Results from '../../components/results';
import Loading from '../../components/loading';
import NoResults from '../../components/no-results';
import Header from '../../components/header/presentation';

const HomePage: FunctionComponent = () => {
    const router = useRouter();
    const [currentQuery, setCurrentQuery] = useState<string | string[]>('');
    const [result, setResult] = useState<IJoke[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const hasNoContent = result.length === 0;
    const hasContent = result.length > 0;

    const fetch = async (query: string | string[]) => {
        setLoading(true);
        try {
            const result = await axios.get(
                `/api/chuck-norris-facts/jokes/search`,
                {
                        params: {
                            query: query
                        }
                }
            );
            setResult(result?.data?.result);
            setLoading(false);
            setCurrentQuery(query);
            await router.push(`/search?query=${query}`);
        } catch(error) {
            setLoading(false);
            console.error(error);
        }
    }

    useEffect(() => {
        if(router.isReady) {
            const { query } = router.query;
            if (query) {
                fetch(query);
                setCurrentQuery(query);
            }
        }
    }, [router.isReady])

    return (
        <>
            <CustomHead />
            <Header
                fetch={fetch}
                initialQuery={currentQuery}
            />
            {loading && (
                <Loading />
            )}
            {hasContent && !loading && (
                <Results result={result} query={currentQuery} />
            )}
            {hasNoContent && !loading && currentQuery &&(
                <NoResults query={currentQuery} />
            )}
        </>
    )
  };

export default HomePage;
