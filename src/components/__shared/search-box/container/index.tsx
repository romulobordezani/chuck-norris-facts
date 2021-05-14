import SearchBoxPresentation from '../presentation';
import { FormEvent, FunctionComponent, useCallback, useState } from 'react';
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
        const isTheQueryFullFilled = query !== '';

        if (isTheQueryFullFilled) {
            router.push(`/jokes/search?query=${query}`);
        }

        dispatch(actions.handleSubmit(event, query));
    }, [dispatch, query]);

    const handleLuckySubmit = useCallback(() => {
        const isTheQueryFullFilled = query !== '';

        if (isTheQueryFullFilled) {
            router.push(`/jokes/search?query=${query}&lucky=true`);
        }

        dispatch(actions.handleLuckySubmit(query));
    }, [dispatch, query]);

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