import InputSearch from '.';
import { render } from '@test';
import React from 'react';
import { fireEvent, screen } from '@testing-library/react';

describe('<InputSearch />', () => {
    it('Should update the state when the user changes the input value', async () => {
        const setQuery = jest.fn();
        const NEW_STRING = 'New Search String';

        render((
            <InputSearch query={'mockQuery'} setQuery={setQuery}/>
        ), {});

        const inputSearch = await screen.getByRole('searchbox');
        fireEvent.change(inputSearch, { target: { value: NEW_STRING } });

        expect(setQuery).toBeCalledWith(NEW_STRING);
    });

    it('Should update the state when the user empty the field', async () => {
        const setQuery = jest.fn();
        const NEW_STRING = '';

        render((
            <InputSearch query={'mockQuery'} setQuery={setQuery}/>
        ), {});

        const inputSearch = await screen.getByRole('searchbox');
        fireEvent.change(inputSearch, { target: { value: NEW_STRING } });

        expect(setQuery).toBeCalledWith(NEW_STRING);
    });

    it('Should has expected char limiters', async () => {
        const setQuery = jest.fn();
        const MAX_LENGTH = 120;
        const MIN_LENGTH = 3;

        render((
            <InputSearch query={'mockQuery'} setQuery={setQuery}/>
        ), {});

        const inputSearch = await screen.getByRole('searchbox');

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        expect(inputSearch.maxLength).toBe(MAX_LENGTH);

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        expect(inputSearch.minLength).toBe(MIN_LENGTH);
    });
});