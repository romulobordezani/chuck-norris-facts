import PageSearchPresentation from '../presentation';
import React, { FunctionComponent, useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../../store';
import { ISearchPageProps } from '../../../pages/jokes/search';
import { IJoke } from '@types';
import { reset, fetchSet } from '../../__shared/search-box/action-creators';
import { useRouter } from 'next/router';

const PageSearchContainer: FunctionComponent<ISearchPageProps> = ({
   initialResult = [],
   initialQuery,
   initialLucky
}) => {
    const {
        data,
        loading,
        error,
        query,
        isALucky,
        isAnEmpty
    } = useSelector((state: IRootState) => state.search);
    
    const [currentQuery, setCurrentQuery] = useState(initialQuery);
    const [joinedData, setJoinedData] = useState<IJoke[]>(initialResult);
    const hasNoContent = joinedData?.length === 0;
    const hasContent = joinedData?.length > 0;

    const router = useRouter();
    const dispatch = useDispatch();

    const resetState = useCallback((): void => {
        dispatch(reset());
        router.push('/jokes/search');
    }, [dispatch, data, currentQuery]);

    useEffect(() => {
        /* istanbul ignore next -- Dispatched within SSR  */
        if (data) {
            setJoinedData(data);
        }
    }, [data, initialResult]);

    useEffect(() => {
        dispatch(fetchSet(joinedData));
    }, []);

    useEffect(() => {
        setCurrentQuery(query);
    }, [query]);

    return (
       <PageSearchPresentation data={joinedData} {...{
           loading,
           hasNoContent,
           hasContent,
           currentQuery,
           initialQuery,
           initialResult,
           initialLucky,
           error,
           isALucky,
           isAnEmpty,
           resetState
       }} />
    );
};

export default PageSearchContainer;