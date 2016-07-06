import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import CoursesPage from './components/coursesPage';

export default (
	<Route path="/" component={App}>
		<IndexRoute component={CoursesPage}/>
	</Route>
);
