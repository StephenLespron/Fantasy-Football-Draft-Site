import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { loadDraft } from '../../ducks/draftReducer';
import RunningDraftList from '../RunningDraftList';
import Roster from './Roster';
import TeamStats from './TeamStats';
import { connect } from 'react-redux';
import './TeamPage.css';

function TeamPage(props) {
	const [teams, setTeams] = useState([]);
	const [currentTeam, setCurrent] = useState('');
	const [roster, setRoster] = useState(new Array(16));

	useEffect(() => {
		axios
			.get(`api/draftedPlayers/${props.match.params.draftId}`)
			.then((res) => {
				let { players, teams } = res.data;

				let teamsArr = teams.map((el) => {
					return (
						<option key={el.team_id} value={el.team_name}>
							{el.team_name}
						</option>
					);
				});

				setTeams(teamsArr);
				setCurrent(teams[0].team_name);

				props.loadDraft(teams, players);
			})
			.catch((err) => console.log('err', props.match.params.draftId));
	}, []);

	return (
		<div className='TeamPage'>
			<div>
				<div id='teamList'>
					<p>Displayed Team:</p>

					<select
						value={currentTeam}
						onChange={(ev) => setCurrent(ev.target.value)}>
						{teams}
					</select>
				</div>
				<div
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						width: '70%',
					}}>
					<RunningDraftList />
					<Roster currentTeam={currentTeam} />
				</div>
				<TeamStats currentTeam={currentTeam} />
			</div>
		</div>
	);
}

let mapStateToProps = (state) => state;

export default connect(mapStateToProps, { loadDraft })(TeamPage);
