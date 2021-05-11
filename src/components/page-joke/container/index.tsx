import PageJokePresentation from '../presentation';
import { FunctionComponent } from 'react';
import { useRouter } from 'next/router';
import { IJoke, IQuery } from '@types';

export interface IPageJokeContainerProps {
    joke: IJoke;
    host: string;
}

const PageJokeContainer: FunctionComponent<IPageJokeContainerProps> = ({ joke, host }) => {
    const router = useRouter();

    const fetch = async (query: IQuery) => {
        try {
            await router.push(`/jokes/search?query=${query}`);
        } catch(error) {
            console.error(error);
        }
    }

    return (
        <PageJokePresentation {...{ joke, fetch, host }} />
    )
}

export default PageJokeContainer;