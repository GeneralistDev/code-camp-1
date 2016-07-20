/* eslint-disable import/default */

import { combineReducers } from 'redux';
import courses from './courseReducer';
import times from './timeReducer';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
	courses,
	times,
	routing: routerReducer
});

export default rootReducer;