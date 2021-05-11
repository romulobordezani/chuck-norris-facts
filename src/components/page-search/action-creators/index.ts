import { AnyAction } from 'redux'
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import * as events from './redux-types';
import axios from 'axios';
import { IJoke, IQuery } from '@types';

export interface IAction {
    type: string;
    payload?: any;
}

export const fetchLoading = ():IAction => ({ type: events.FETCH_LOADING });

export const fetchError = ():IAction => ({ type: events.FETCH_ERROR });

export const fetchSet = (result: IJoke[]):IAction => ({ type: events.FETCH_SET, payload: result });

export const fetchSetLuck = (result: IJoke[]):IAction => ({ type: events.FETCH_SET_LUCK, payload: result });

export interface ISearchForJokes {
    (query: IQuery, luck: boolean): ThunkAction<Promise<void>, unknown, unknown, AnyAction>;
}

export const searchForJokes: ISearchForJokes = (
    query: IQuery,
    luck: boolean
) =>
    async (dispatch: ThunkDispatch<unknown, unknown, AnyAction>) => {
        dispatch(fetchLoading());

        try {
            const result = await axios.get(
                `/api/chuck-norris-facts/jokes/search`,
                {
                    params: {
                        query: query
                    }
                }
            );

            if (luck) {
                dispatch(fetchSetLuck(result.data.result));
                return;
            }

            dispatch(fetchSet(result.data.result));
        } catch(error) {
            dispatch(fetchError());
            console.error(error);
        }
    };