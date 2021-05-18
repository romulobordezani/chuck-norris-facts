import { FormEvent } from 'react';
import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import * as events from './redux-types';
import axios from 'axios';
import { IJoke, IQuery } from '@types';

export interface IAction {
    type: string;
    payload?: any;
}

export interface ISearchForJokes {
    (query: IQuery): ThunkAction<Promise<void>, unknown, unknown, AnyAction>;
}

export interface IHandleSubmit {
    (event: FormEvent | null, query: IQuery): ThunkAction<Promise<void>, unknown, unknown, AnyAction>;
}

export interface IHandleLuckySubmit {
    (query: IQuery): ThunkAction<Promise<void>, unknown, unknown, AnyAction>;
}

export const fetchLoading = ():IAction => ({ type: events.FETCH_LOADING });

export const reset = ():IAction => ({ type: events.USER_RESETED });

export const fetchError = ():IAction => ({ type: events.FETCH_ERROR });

export const fetchSet = (payload: { result: IJoke[], total: number }):IAction => ({ type: events.FETCH_SET, payload });

export const fetchSetLuck = (payload: { result: IJoke[], total: number }):IAction => ({ type: events.FETCH_SET_LUCK, payload });

export const handleSubmit: IHandleSubmit = (event, query) => async dispatch => {
    event?.preventDefault();

    if (query === '') {
        dispatch({ type: events.USER_SUBMITTED_AN_EMPTY_VALUE });
        return;
    }

    dispatch({ type: events.USER_SUBMITTED, query });
    dispatch(searchForJokes(query));
};

export const handleLuckySubmit: IHandleLuckySubmit = (query: IQuery) => async dispatch => {
    if (query === '') {
        dispatch({ type: events.USER_SUBMITTED_AN_EMPTY_VALUE });
        return;
    }

    dispatch({ type: events.USER_LUCKY_SUBMITTED, query });
    dispatch(searchForALuckyJoke(query));
};

export const searchForJokes: ISearchForJokes = (query: IQuery) =>
    async (dispatch: ThunkDispatch<unknown, unknown, AnyAction>) => {
        dispatch(fetchLoading());

        try {
            const result = await axios.get(
                `/api/chuck-norris-facts/jokes/search`,
                { params: { query } }
            );

            dispatch(fetchSet(result.data));
        } catch(error) {
            dispatch(fetchError());
            console.error(error);
        }
    };

export const searchForALuckyJoke: ISearchForJokes = (query: IQuery) =>
    async (dispatch: ThunkDispatch<unknown, unknown, AnyAction>) => {
        dispatch(fetchLoading());

        try {
            const result = await axios.get(
                `/api/chuck-norris-facts/jokes/search`,
                { params: { query } }
            );

            dispatch(fetchSetLuck(result.data));
        } catch(error) {
            dispatch(fetchError());
            console.error(error);
        }
    };