/* eslint-disable import/default */

import { combineReducers } from 'redux';
import courses from './courseReducer';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
	courses,
	routing: routerReducer
});

export default rootReducer;