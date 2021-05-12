import React, { FunctionComponent } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import store from '../store';

const ProviderMock: FunctionComponent = ({ children }) => (
	<ReduxProvider store={store}>{children}</ReduxProvider>
);

export default ProviderMock;
