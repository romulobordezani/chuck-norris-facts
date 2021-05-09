import React, { FunctionComponent } from 'react';
import { IJoke } from '@types';

interface IJokeProps {
    joke: IJoke | null
}

const Joke: FunctionComponent<IJokeProps> = ({ joke }) => {
    return (
        <div key={joke?.id}>
            <div>{joke?.value}</div>
            <hr />
        </div>
    )
}

export default Joke;