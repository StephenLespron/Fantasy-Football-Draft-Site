import React from 'react';
import { connect } from 'react-redux';
import { undraftPlayer } from '../ducks/draftReducer';

function RunningDraftList(props) {
	let displayPlayers = props.draft.draftedPlayers.sort((a, b) =>
		a.pick < b.pick ? 1 : -1
	);

	displayPlayers = displayPlayers.map((elem) => {
		if (!elem.playerId) {
			return (
				<tr key='0' className='playerBox'>
					<td>##</td>
					<td>n/a</td>
					<td>Player Removed</td>
				</tr>
			);
		}

		return (
			<tr
				key={elem.playerId}
				className='playerBox'
				onDoubleClick={() => undraftPlayer(elem.playerId)}>
				<td>{`${Math.floor((elem.pick - 1) / 12) + 1}.${
					((elem.pick - 1) % 12) + 1
				}`}</td>
				<td>{elem.fTeam}</td>
				<td>
					{`${elem.firstName} ${elem.lastName} (${elem.team}, ${elem.position})`}{' '}
				</td>
			</tr>
		);
	});

	let undraftPlayer = (playerId) => {
		let { draftedPlayers } = props.draft;

		let newDrafted = draftedPlayers;

		let [newAvail] = newDrafted.splice(
			newDrafted.findIndex((elem) => elem.playerId === playerId)
		);

		console.log(newAvail, newDrafted);

		delete newAvail.fTeam;
		delete newAvail.pick;

		props.undraftPlayer(newDrafted, newAvail);
	};
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
					{displayPlayers}
				</table>
			</div>
		</div>
	);
}

let mapStateToProps = (state) => state;

export default connect(mapStateToProps, { undraftPlayer })(RunningDraftList);
