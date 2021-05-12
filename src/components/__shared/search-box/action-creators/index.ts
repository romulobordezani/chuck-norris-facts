import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import * as events from './redux-types';
import axios from 'axios';
import { IJoke, IQuery } from '@types';
import { FormEvent } from 'react';

export interface IAction {
    type: string;
    payload?: any;
}

export interface ISearchForJokes {
    (query: IQuery, luck?: undefined | boolean): ThunkAction<Promise<void>, unknown, unknown, AnyAction>;
}

export interface IHandleSubmit {
    (event: FormEvent | null, query: IQuery): ThunkAction<Promise<void>, unknown, unknown, AnyAction>;
}

export interface IHandleLuckySubmit {
    (query: IQuery): ThunkAction<Promise<void>, unknown, unknown, AnyAction>;
}

export const fetchLoading = ():IAction => ({ type: events.FETCH_LOADING });

export const fetchError = ():IAction => ({ type: events.FETCH_ERROR });

export const fetchSet = (result: IJoke[]):IAction => ({ type: events.FETCH_SET, payload: result });

export const fetchSetLuck = (result: IJoke[]):IAction => ({ type: events.FETCH_SET_LUCK, payload: result });

export const handleSubmit: IHandleSubmit = (event, query) => async dispatch => {
    event?.preventDefault();

    if (query === '') {
        dispatch({ type: events.USER_SUBMITTED_AN_EMPTY_VALUE });
        return;
    }

    dispatch({ type: events.USER_SUBMITTED, payload: query });
    dispatch(searchForJokes(query));
};

export const handleLuckySubmit: IHandleLuckySubmit = (query) => async dispatch => {
    if (query === '') {
        dispatch({ type: events.USER_SUBMITTED_AN_EMPTY_VALUE });
        return;
    }

    dispatch({ type: events.USER_LUCKY_SUBMITTED, payload: query });
    dispatch(searchForALuckyJoke(query));
};

export const searchForJokes: ISearchForJokes = (query) =>
    async (dispatch: ThunkDispatch<unknown, unknown, AnyAction>) => {
        dispatch(fetchLoading());

        try {
            const result = await axios.get(
                `/api/chuck-norris-facts/jokes/search`,
                { params: { query } }
            );

            dispatch(fetchSet(result.data.result));
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

            dispatch(fetchSetLuck(result.data.result));
        } catch(error) {
            dispatch(fetchError());
            console.error(error);
        }
    };