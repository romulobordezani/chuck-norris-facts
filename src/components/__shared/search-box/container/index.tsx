import SearchBoxPresentation from '../presentation';
import React, { 
    FormEvent,
    FunctionComponent,
    useCallback,
    useEffect,
    useState,
    useRef
} from 'react';
import { IQuery } from '@types';
import * as actions from '../action-creators';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from 'store';

export interface ISearchBoxContainerProps {
    initialQuery: IQuery;
}

const SearchBoxContainer: FunctionComponent<ISearchBoxContainerProps> = ({
    initialQuery
}) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { data } = useSelector((state: IRootState) => state.search);
    const [query, setQuery] = useState<IQuery>(initialQuery);
    const inputEl = useRef<HTMLInputElement>(null);

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

    useEffect(() => {
        const hasContent = data.length > 0;

        if (hasContent) {
            inputEl?.current?.blur();
        }
    }, [data]);

    return (
        <SearchBoxPresentation {...{
            handleSubmit,
            handleLuckySubmit,
            query,
            setQuery,
            inputEl
        }} />
    );
};

export default SearchBoxContainer;