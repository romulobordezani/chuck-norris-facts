import { combineReducers } from 'redux';

import * as events from '../action-creators/redux-types';
import { IJoke } from '@types';

interface IReduxAction {
    type: string;
    payload?: any;
}

const getRandomFact = (payload: IJoke[]): IJoke[] => {
    return [payload[Math.floor(Math.random() * payload.length)]]
}

const query = (state: string | null = null, action: IReduxAction) => {
    switch (action.type) {
        case events.USER_INPUTTED:
            return action.payload;
        default:
            return state;
    }
};

const data = (state: unknown = null, action: IReduxAction) => {
    switch (action.type) {
        case events.FETCH_SET:
            return action.payload;
        case events.FETCH_SET_LUCK:
            return getRandomFact(action.payload);
        case events.FETCH_ERROR:
        case events.FETCH_LOADING:
            return null;
        default:
            return state;
    }
};

const loading = (state: boolean | null = null, action: IReduxAction) => {
    switch (action.type) {
        case events.FETCH_LOADING:
            return true;
        case events.FETCH_SET:
        case events.FETCH_ERROR:
        case events.FETCH_SET_LUCK:
            return false;
        default:
            return state;
    }
};

const error = (state: boolean | null = null, action: IReduxAction) => {
    switch (action.type) {
        case events.FETCH_ERROR:
            return true;
        case events.FETCH_SET:
        case events.FETCH_LOADING:
        case events.FETCH_SET_LUCK:
            return null;
        default:
            return state;
    }
};

export interface State {
    query: string;
    data: IJoke[],
    error: boolean;
    loading: boolean;
}

export default combineReducers<State>({ query, data, error, loading });