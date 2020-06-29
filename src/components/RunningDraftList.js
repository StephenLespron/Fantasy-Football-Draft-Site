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

<<<<<<< HEAD
		delete newAvail.teamName;
		delete newAvail.draft_pickIndex;
=======
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
>>>>>>> my-temp-work

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
<<<<<<< HEAD
			a.draft_pickIndex < b.draft_pickIndex ? 1 : -1
=======
			a.draft_pick_index < b.draft_pick_index ? 1 : -1
>>>>>>> my-temp-work
		);

		// eslint-disable-next-line array-callback-return
		arr = arr.map((elem, ind) => {
<<<<<<< HEAD
			if (elem.playerId) {
=======
			if (elem.player_id) {
>>>>>>> my-temp-work
				return (
					<tr
						key={elem.player_id}
						className='playerBox'
<<<<<<< HEAD
						onDoubleClick={() => undraftPlayer(elem.playerId)}>
						<td>{`${Math.floor((elem.draft_pickIndex - 1) / 12) + 1}.${
							((elem.draft_pickIndex - 1) % 12) + 1
=======
						style={!props.user.isLoggedIn ? { pointerEvents: 'none' } : {}}
						onDoubleClick={() => undraftPlayer(elem.player_id)}>
						<td>{`${Math.floor((elem.draft_pick_index - 1) / 12) + 1}.${
							((elem.draft_pick_index - 1) % 12) + 1
>>>>>>> my-temp-work
						}`}</td>
						<td>{elem.teamName}</td>
						<td>
							{`${elem.firstName} ${elem.lastName} (${elem.team}, ${elem.position})`}{' '}
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
