import React, { FunctionComponent, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { IJoke } from '@types';
import axios from 'axios';

import CustomHead from '../../components/__shared/custom-head';
import Joke from '../../components/joke';

const JokePage: FunctionComponent = () => {
    const router = useRouter();
    const { id } = router.query;
    const [joke, setJoke] = useState<IJoke | null>(null);

    useEffect(() => {
        try {
            if (id) {
                axios.get(`/api/chuck-norris-facts/jokes/${id}`)
                    .then(result => {
                        setJoke(result?.data);
                    })
                    .catch(error => {
                        console.error(error);
                    });
            }

        } catch(error) {
            console.error(error);
        }
    }, [id]);

    return (
        <>
            <CustomHead />
            <Joke joke={joke}/>
        </>
    )

};

export default JokePage;
