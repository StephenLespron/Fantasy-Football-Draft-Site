import React from 'react';
import { connect } from 'react-redux';

function RunningDraftList(props) {
	let displayPlayers = props.draft.draftedPlayers.map((elem) => {
		console.log('tried');
		if (!elem) {
			return (
				<tr key='0' className='playerBox'>
					<td>1.1</td>
					<td>Jared</td>
					<td>Pending First Pick...</td>
				</tr>
			);
		}
		return (
			<tr key={elem.playerId} className='playerBox'>
				<td>1.1</td>
				<td>Jared</td>
				<td>
					{`${elem.firstName} ${elem.lastName} (${elem.team}, ${elem.position})`}{' '}
				</td>
			</tr>
		);
	});
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

export default connect(mapStateToProps)(RunningDraftList);
