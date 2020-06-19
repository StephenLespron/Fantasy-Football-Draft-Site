import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Landing from './components/Landing';
import Dashboard from './components/Dashboard';

export default (
	<Switch>
		<Route exact path='/' component={Landing} />
		<Route path='/dashboard' component={Dashboard} />
		<Route path='/dashboard' component={Dashboard} />
		<Route path='/dashboard' component={Dashboard} />
	</Switch>
);
