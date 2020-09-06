import '@babel/polyfill';
import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';
import store from './store/store';
import './index.scss';

ReactDOM.hydrate(
	<Provider store={store}>
		<Router>
			<Fragment>{renderRoutes(Routes)}</Fragment>
		</Router>
	</Provider>,
	document.getElementById('root')
);
