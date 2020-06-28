import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import DraftBoard from './components/DraftBoard/DraftBoard';
import Manager from './components/Manager/Manager';
import Settings from './components/Settings/Settings';
import NewDraft from './components/NewDraft/NewDraft';
import TeamPage from './components/TeamPage/TeamPage';

export default (
	<Switch>
		<Route exact path='/' component={Landing} />
		<Route path='/dashboard' component={Dashboard} />
		<Route path='/draft/:draftId/board' component={DraftBoard} />
		<Route path='/draft/:draftId/teams' component={TeamPage} />
		<Route path='/settings' component={Settings} />
		<Route path='/draft/:draftId/manager' component={Manager} />
		<Route path='/new-draft' component={NewDraft} />
	</Switch>
);
