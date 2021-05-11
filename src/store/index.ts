import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import {
	reducer as search,
	State as SearchState
} from '../components/page-search';

export interface IRootState {
	search: SearchState
}

export default createStore(
	combineReducers<IRootState>({
		search
	}),
	composeWithDevTools(applyMiddleware(thunk))
);
