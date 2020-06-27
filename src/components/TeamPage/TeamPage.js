import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getPlayers } from '../../ducks/draftReducer';
import RunningDraftList from '../RunningDraftList';
import Roster from './Roster';

function TeamPage(props) {
	const [roster, setRoster] = useState(new Array(16));
	const [teams, setTeams] = useState([]);
	const [currentTeam, setCurrentTeam] = useState([]);

	useEffect(() => {
		axios
			.get(`api/draftedPlayers/${+props.match.params.draftId}`)
			.then((res) => {
				setTeams(res.data.teams);
				props.getPlayers(
					res.data.players,
					[],
					res.data.teams,
					+props.match.params.draftId
				);
				setCurrentTeam(res.data.teams[0]);
			});
	}, []);

	useEffect(() => {
		if (props.draft.draftedPlayers) {
			if (props.draft.draftedPlayers.length > 0) {
				setRoster(
					props.draft.draftedPlayers
						.filter((el) => el.teamName === currentTeam.teamName)
						.sort((a, b) => a.ppg > b.ppg)
				);
			}
		}
	}, [currentTeam]);
	return (
		<div>
			<RunningDraftList />
			<Roster roster={roster} />
		</div>
	);
}
let mapStateToProps = (state) => state;

export default connect(mapStateToProps, { getPlayers })(TeamPage);
