/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { undraftPlayer } from '../ducks/draftReducer';

function RunningDraftList(props) {
	const [draftedArr, setDrafted] = useState([]);

	let undraftPlayer = (id) => {
		let { draftedPlayers } = props.draft;

		let newDrafted = draftedPlayers;

		let index = newDrafted.findIndex((elem) => elem.player_id === id);

		let [newAvail] = newDrafted.splice(index, 1);

		let {
			adp,
			first_name: firstName,
			last_name: lastName,
			player_id: playerId,
			position,
			team,
		} = newAvail;

		delete newAvail.team_name;
		delete newAvail.pick;

		axios
			.delete(`api/removePlayer/${id}`)
			.catch((err) => alert(err.response.data));

		props.undraftPlayer(newDrafted, {
			firstName,
			lastName,
			playerId,
			position,
			team,
			adp,
		});
	};

	function displayPlayers() {
		let arr = props.draft.draftedPlayers.sort((a, b) =>
			a.draft_pick_index < b.draft_pick_index ? 1 : -1
		);

		// eslint-disable-next-line array-callback-return
		arr = arr.map((elem, ind) => {
			if (elem.player_id) {
				return (
					<tr
						key={elem.player_id}
						className='playerBox'
						style={!props.user.isLoggedIn ? { pointerEvents: 'none' } : {}}
						onDoubleClick={() => undraftPlayer(elem.player_id)}>
						<td>{`${Math.floor((elem.draft_pick_index - 1) / 12) + 1}.${
							((elem.draft_pick_index - 1) % 12) + 1
						}`}</td>
						<td>{elem.teamName}</td>
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
		if (props.draft.draftedPlayers) {
			displayPlayers();
		}
	}, [props.draft.draftedPlayers]);

	return (
		<div id='rdList'>
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
