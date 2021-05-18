import PageSearchPresentation from '../presentation';
import React, { FunctionComponent, useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../../store';
import { ISearchPageProps } from '../../../pages/jokes/search';
import { reset, fetchSet } from '../../__shared/search-box/action-creators';
import { useRouter } from 'next/router';
import { IQuery } from '@types';

const PageSearchContainer: FunctionComponent<ISearchPageProps> = ({
   initialResult = [],
   initialQuery = '',
   initialLucky,
   initialTotal
}) => {
    const {
        data,
        loading,
        error,
        query,
        isALucky,
        isAnEmpty,
        total
    } = useSelector((state: IRootState) => state.search);
    
    const [currentQuery, setCurrentQuery] = useState<IQuery>(initialQuery);
    const [currentTotal, setCurrentTotal] = useState<number>(initialTotal);
    
    const hasContent = data?.length > 0;
    const hasNoContent = data?.length === 0;

    const router = useRouter();
    const dispatch = useDispatch();

    const resetState = useCallback((): void => {
        dispatch(reset());
        router.push('/jokes/search');
    }, [dispatch, data, currentQuery, currentTotal]);

    useEffect(() => {
        dispatch(fetchSet({ result: initialResult, total: currentTotal }));
    }, []);

    useEffect(() => {
        setCurrentQuery(query);
    }, [query]);

    useEffect(() => {
        setCurrentTotal(total);
    }, [total]);

    return (
       <PageSearchPresentation {...{
           data,
           loading,
           hasNoContent,
           hasContent,
           currentQuery,
           currentTotal,
           initialQuery,
           initialResult,
           initialTotal,
           initialLucky,
           error,
           isALucky,
           isAnEmpty,
           resetState           
       }} />
    );
};

export default PageSearchContainer;