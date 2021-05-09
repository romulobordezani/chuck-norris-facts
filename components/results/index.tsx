import React, { FunctionComponent } from 'react';
import { IJoke } from '@types';
import Joke from '../joke';

interface IResult {
    result: IJoke[]
}

const Results: FunctionComponent<IResult> = ({ result }) => {
    return (
        <div>
            {result.map(joke => (
                <Joke key={joke.id} joke={joke} />
            ))}
        </div>
    )
}

export default Results;