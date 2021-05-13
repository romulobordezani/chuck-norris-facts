import PageJokePresentation from '../presentation';
import { FunctionComponent } from 'react';
import { IJoke } from '@types';

export interface IPageJokeContainerProps {
    joke: IJoke | null;
    host?: string;
}

const PageJokeContainer: FunctionComponent<IPageJokeContainerProps> = ({ joke, host }) => {
    return (
        <PageJokePresentation {...{ joke, host }} />
    );
};

export default PageJokeContainer;