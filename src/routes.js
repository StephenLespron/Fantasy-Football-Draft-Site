import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard';
import Settings from './components/Settings/Settings';

export default (
	<Switch>
		<Route exact path='/' component={Landing} />
		<Route path='/dashboard' component={Dashboard} />
		<Route path='/settings' component={Settings} />
		<Route path='/dashboard' component={Dashboard} />
	</Switch>
);
