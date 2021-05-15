import PageJokePresentation from '../presentation';
import { FunctionComponent, useCallback } from 'react';
import { IJoke } from '@types';
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { reset } from "../../__shared/search-box/action-creators";

export interface IPageJokeContainerProps {
    joke: IJoke | null;
    host?: string;
}

const PageJokeContainer: FunctionComponent<IPageJokeContainerProps> = ({ joke, host }) => {
    const router = useRouter();
    const dispatch = useDispatch();

    const resetState = useCallback((): void => {
        dispatch(reset());
        router.push('/jokes/search');
    }, [dispatch]);

    return (
        <PageJokePresentation resetState={resetState} {...{ joke, host }} />
    );
};

export default PageJokeContainer;