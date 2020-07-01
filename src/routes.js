import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Landing from './components/Landing/Landing';
import TeamPage from './components/TeamPage/TeamPage';
import DraftBoard from './components/DraftBoard/DraftBoard';
import ProtectedRoute from './ProtectedRoute';

import Dashboard from './components/Dashboard/Dashboard';
import Manager from './components/Manager/Manager';
import Settings from './components/Settings/Settings';
import NewDraft from './components/NewDraft/NewDraft';

export default (
	<Switch>
		<Route exact path='/' component={Landing} />
		<Route path='/draft/:draftId/teams' component={TeamPage} />
		<Route path='/draft/:draftId/board' component={DraftBoard} />
		<ProtectedRoute path='/draft/:draftId/manager' component={Manager} />
		<ProtectedRoute path='/dashboard' component={Dashboard} />
		<ProtectedRoute path='/settings' component={Settings} />
		<ProtectedRoute path='/new-draft' component={NewDraft} />
	</Switch>
);
