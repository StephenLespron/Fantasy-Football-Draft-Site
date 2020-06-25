import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard';
import Manager from './components/Manager/Manager';
import Settings from './components/Settings/Settings';
import NewDraft from './components/NewDraft/NewDraft';

export default (
	<Switch>
		<Route exact path='/' component={Landing} />
		<Route path='/dashboard' component={Dashboard} />
		<Route path='/settings' component={Settings} />
		<Route path='/manager' component={Manager} />
		<Route path='/new-draft' component={NewDraft} />
	</Switch>
);
