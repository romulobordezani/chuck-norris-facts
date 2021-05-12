import React, { FunctionComponent, useEffect, useState } from 'react';
import PageSearchPresentation from '../presentation';
import { useSelector } from 'react-redux';
import { IRootState } from '../../../store';
import { ISearchPageProps } from '../../../pages/jokes/search';
import { IJoke } from '@types';

const PageSearchContainer: FunctionComponent<ISearchPageProps> = ({
   initialResult = [],
   initialQuery,
   initialLucky
}) => {
    const { data, loading, error, query, isALucky, isAnEmpty } = useSelector((state: IRootState) => state.search);
    
    const currentQuery = query;
    const [joinedData, setJoinedData] = useState<IJoke[]>(initialResult);
    const hasNoContent = joinedData?.length === 0;
    const hasContent = joinedData?.length > 0;

    useEffect(() => {
        if (data) {
            setJoinedData(data);
        }
    }, [data]);

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
           isAnEmpty
       }} />
    );
};

export default PageSearchContainer;