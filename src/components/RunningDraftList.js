import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { undraftPlayer } from '../ducks/draftReducer';

function RunningDraftList(props) {
	const [draftedArr, setDrafted] = useState([]);

	let undraftPlayer = (playerId) => {
		let { draftedPlayers } = props.draft;

		let newDrafted = draftedPlayers;

		let index = newDrafted.findIndex((elem) => elem.playerId === playerId);

		let [newAvail] = newDrafted.splice(index, 1);

		delete newAvail.fTeam;
		delete newAvail.pick;

		axios
			.delete(`api/removePlayer/${playerId}`)
			.catch((err) => alert(err.response.data));

		props.undraftPlayer(newDrafted, newAvail);
	};

	function displayPlayers() {
		let arr = props.draft.draftedPlayers.sort((a, b) =>
			a.draftPickIndex < b.draftPickIndex ? 1 : -1
		);

		arr = arr.map((elem, ind) => {
			if (elem.player_id) {
				console.log('players:', elem);
				return (
					<tr
						key={elem.playerId}
						className='playerBox'
						onDoubleClick={() => undraftPlayer(elem.playerId)}>
						<td>{`${Math.floor((elem.draft_pick_index - 1) / 12) + 1}.${
							((elem.draft_pick_index - 1) % 12) + 1
						}`}</td>
						<td>{elem.team_name}</td>
						<td>
							{`${elem.first_name} ${elem.last_name} (${elem.team}, ${elem.position})`}{' '}
						</td>
					</tr>
				);
			}
		});
		setDrafted(arr);
	}

	useEffect(() => {
		displayPlayers();
	}, [props.draft.draftedPlayers]);

	return (
		<div>
			<div className='PlayersBox'>
				<table className='PlayersTable'>
					<thead>
						<tr>
							<th>Pick</th>
							<th>Team</th>
							<th>Player</th>
						</tr>
					</thead>
					<tbody>{draftedArr}</tbody>
				</table>
			</div>
		</div>
	);
}

let mapStateToProps = (state) => state;

export default connect(mapStateToProps, { undraftPlayer })(RunningDraftList);
