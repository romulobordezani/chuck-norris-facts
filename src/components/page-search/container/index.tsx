import { FunctionComponent, useCallback, useEffect, useState } from 'react';
import PageSearchPresentation from '../presentation';
import { useRouter } from 'next/router';
import { searchForJokes } from '../action-creators';
import { useSelector, useDispatch } from 'react-redux';
import { IQuery } from '@types';
import { IRootState } from '../../../store';

const SearchContainer: FunctionComponent = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { data, loading, error } = useSelector((state: IRootState) => state.search)

    const [currentQuery, setCurrentQuery] = useState<IQuery>('');
    const hasNoContent = data?.length === 0;
    const hasContent = data?.length > 0;

    const fetch = useCallback((query: IQuery, luck?: boolean) => {
        router.push(`/jokes/search?query=${query}`);
        setCurrentQuery(query);
        dispatch(searchForJokes(query, luck));
    }, [dispatch]);

    useEffect(() => {
        if(router.isReady) {
            const { query } = router.query;
            if (query) {
                fetch(query);
                setCurrentQuery(query);
            }
        }
    }, [router.isReady]);

    return (
       <PageSearchPresentation {...{
           fetch,
           data,
           loading,
           hasNoContent,
           hasContent,
           currentQuery,
           error
       }} />
    )
}

export default SearchContainer;