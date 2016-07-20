/* eslint-disable import/default */

import React from 'react';
import './styles/styles.scss';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// Needed for onTouchTap
injectTapEventPlugin();

import configureStore from './store/configureStore';
const store = configureStore();

import routes from './routes';

render(
	<Provider store={store}>
		<MuiThemeProvider>
			<Router history={browserHistory} routes={routes}/>
		</MuiThemeProvider>
	</Provider>, document.getElementById('app')
);
