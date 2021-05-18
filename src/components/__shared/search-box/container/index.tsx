import SearchBoxPresentation from '../presentation';
import React, { FormEvent, FunctionComponent, useCallback, useEffect, useState } from 'react';
import { IQuery } from '@types';
import * as actions from '../action-creators';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

export interface ISearchBoxContainerProps {
    initialQuery: IQuery;
}

const SearchBoxContainer: FunctionComponent<ISearchBoxContainerProps> = ({
    initialQuery
}) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [query, setQuery] = useState<IQuery>(initialQuery);

    const handleSubmit = useCallback((event: FormEvent | null): void => {
        dispatch(actions.handleSubmit(event, query));
        router.push(`/jokes/search?query=${query}`);
    }, [dispatch, query, initialQuery]);

    const handleLuckySubmit = useCallback(() => {
        dispatch(actions.handleLuckySubmit(query));
        router.push(`/jokes/search?query=${query}&lucky=true`);
    }, [dispatch, query, initialQuery]);

    useEffect(() => {
        setQuery(initialQuery);
    }, [initialQuery]);

    return (
        <SearchBoxPresentation {...{
            handleSubmit,
            handleLuckySubmit,
            query,
            setQuery
        }} />
    );
};

export default SearchBoxContainer;