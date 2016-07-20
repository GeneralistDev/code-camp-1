import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import CoursesPage from './components/coursesPage';
import TimerPage from './components/timerPage';

export default (
	<Route path="/" component={App}>
		<IndexRoute component={TimerPage}/>
		<Route path="courses" component={CoursesPage}/>
	</Route>
);
