import { combineReducers } from 'redux';

import * as events from '../action-creators/redux-types';
import { IJoke, IQuery } from '@types';

interface IReduxAction {
    type: string;
    payload?: any;
}

export const getRandomFact = (payload: IJoke[]): IJoke[] => {
    return [payload[Math.floor(Math.random() * payload.length)]];
};

export const query = (state: IQuery = '', action: IReduxAction): IQuery => {
    switch (action.type) {
        case events.USER_SUBMITTED:
            return action.payload;
        case events.USER_SUBMITTED_AN_EMPTY_VALUE:
            return '';
        default:
            return state;
    }
};

export const isAnEmpty = (state = false, action: IReduxAction): boolean => {
    switch (action.type) {
        case events.USER_SUBMITTED_AN_EMPTY_VALUE:
            return true;
        case events.USER_SUBMITTED:
        case events.USER_LUCKY_SUBMITTED:
            return false;
        default:
            return state;
    }
};

export const isALucky = (state = false, action: IReduxAction): boolean => {
    switch (action.type) {
        case events.USER_LUCKY_SUBMITTED:
            return true;
        case events.USER_SUBMITTED:
            return false;
        default:
            return state;
    }
};

export const data = (state: IJoke[] | null = null, action: IReduxAction): IJoke[] | null => {
    switch (action.type) {
        case events.FETCH_SET:
            return [...action.payload];
        case events.FETCH_SET_LUCK:
            return getRandomFact(action.payload);
        case events.FETCH_ERROR:
        case events.FETCH_LOADING:
        case events.USER_SUBMITTED_AN_EMPTY_VALUE:
            return [];
        default:
            return state;
    }
};

export const loading = (state = false, action: IReduxAction): boolean => {
    switch (action.type) {
        case events.FETCH_LOADING:
            return true;
        case events.FETCH_SET:
        case events.FETCH_SET_LUCK:
        case events.FETCH_ERROR:
        case events.USER_SUBMITTED_AN_EMPTY_VALUE:
            return false;
        default:
            return state;
    }
};

export const error = (state = false, action: IReduxAction): boolean => {
    switch (action.type) {
        case events.FETCH_ERROR:
            return true;
        case events.FETCH_SET:
        case events.FETCH_SET_LUCK:
        case events.FETCH_LOADING:
        case events.USER_SUBMITTED_AN_EMPTY_VALUE:
            return false;
        default:
            return state;
    }
};

export interface State {
    query: IQuery;
    isALucky: boolean;
    isAnEmpty: boolean;
    data: IJoke[] | null,
    error: boolean;
    loading: boolean;
}

export default combineReducers<State>({ query, data, error, loading, isALucky, isAnEmpty });