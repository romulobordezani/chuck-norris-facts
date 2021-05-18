import { combineReducers } from 'redux';
import * as events from '../action-creators/redux-types';
import { IJoke, IQuery } from '@types';
import { getRandomItem } from '@utils';

interface IReduxAction {
    type: string;
    payload: {
        result: IJoke[],
        total: number
    };
    query: IQuery
}

export const query = (state: IQuery = '', action: IReduxAction): IQuery => {
    switch (action.type) {
        case events.USER_SUBMITTED:
            return action.query;
        case events.USER_SUBMITTED_AN_EMPTY_VALUE:
        case events.USER_RESETED:
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
        case events.USER_RESETED:
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
        case events.USER_SUBMITTED_AN_EMPTY_VALUE:
        case events.USER_RESETED:
            return false;
        default:
            return state;
    }
};

export const data = (state: IJoke[] = [], action: IReduxAction): IJoke[] | [] => {
    switch (action.type) {
        case events.FETCH_SET:
            return action.payload.result;
        case events.FETCH_SET_LUCK:
            return getRandomItem(action.payload.result);
        case events.FETCH_ERROR:
        case events.FETCH_LOADING:
        case events.USER_SUBMITTED_AN_EMPTY_VALUE:
            return [];
        case events.USER_RESETED:
            return [];
        default:
            return state;
    }
};

export const total = (state = 0, action: IReduxAction): number => {
    switch (action.type) {
        case events.FETCH_SET:
            return action.payload.total;
        case events.FETCH_SET_LUCK:
            return 1;
        case events.FETCH_ERROR:
        case events.FETCH_LOADING:
        case events.USER_SUBMITTED_AN_EMPTY_VALUE:
            return 0;
        case events.USER_RESETED:
            return 0;
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
        case events.USER_RESETED:
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
        case events.USER_RESETED:
            return false;
        default:
            return state;
    }
};

export interface State {
    query: IQuery;
    isALucky: boolean;
    isAnEmpty: boolean;
    data: IJoke[] | [];
    error: boolean;
    loading: boolean;
    total: number;
}

export default combineReducers<State>({ 
    query,
    data,
    error,
    loading,
    isALucky,
    isAnEmpty,
    total
});