import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

jest.mock('redux');
jest.mock('redux-devtools-extension');

((createStore as unknown) as jest.Mock).mockImplementation(jest.fn());
((applyMiddleware as unknown) as jest.Mock).mockImplementation(() => jest.fn());
((composeWithDevTools as unknown) as jest.Mock).mockImplementation(() =>
	jest.fn()
);

import './index';

describe('Testing store', () => {
	it('Should be called applyMiddleware function', () => {
		expect(applyMiddleware).toBeCalled();
	});

	it('Should be called composeWithDevTools function', () => {
		expect(composeWithDevTools).toBeCalled();
	});

	it('Should be createStore reducers function', () => {
		expect(createStore).toBeCalled();
	});
});
