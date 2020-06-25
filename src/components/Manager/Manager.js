import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getPlayers } from '../../ducks/draftReducer';
import axios from 'axios';
import RunningDraftList from '../RunningDraftList';
import { draftPlayer } from '../../ducks/draftReducer';
import './Manager.css';

function Manager(props) {
	const [round, setRound] = useState(1);
	const [pick, setPick] = useState(1);
	const [filter, setFilter] = useState('');
	const [availPlayers, setAvailPlayers] = useState([]);
	const [criteria, setCrit] = useState('name');
	const [player, setPlayer] = useState({
		playerId: null,
		firstName: 'Select',
		lastName: 'Player',
		team: 'TM',
		position: 'pos',
	});

	useEffect(() => {
		if (props.draft.availPlayers.length === 0) {
			axios
				.post('api/players')
				.then((res) => {
					props.getPlayers(res.data);
					setAvailPlayers(
						res.data.map((elem) => {
							return (
								<tr
									key={elem.playerId}
									className='playerBox'
									onDoubleClick={(ev) => {
										setPlayer(elem);
									}}>
									<td>{elem.adp}</td>
									<td>{`${elem.firstName} ${elem.lastName}`}</td>
									<td>{elem.team}</td>
									<td>{elem.position}</td>
								</tr>
							);
						})
					);
				})
				.catch((err) => alert(err.response.data));
		}
	}, []);

	let filterPlayers = (sort) => {
		setAvailPlayers(
			props.draft.availPlayers
				.filter((elem) => {
					if (criteria === 'name') {
						if (
							!elem.firstName.toLowerCase().includes(sort.toLowerCase()) &&
							!elem.lastName.toLowerCase().includes(sort.toLowerCase())
						) {
							return false;
						}
					} else if (criteria === 'team' || criteria === 'position') {
						if (!elem[criteria].toLowerCase().includes(sort.toLowerCase())) {
							return false;
						}
					}

					return true;
				})
				.map((elem) => {
					return (
						<tr
							key={elem.playerId}
							className='playerBox'
							onDoubleClick={(ev) => {
								setPlayer(elem);
							}}>
							<td>{elem.adp}</td>
							<td>{`${elem.firstName} ${elem.lastName}`}</td>
							<td>{elem.team}</td>
							<td>{elem.position}</td>
						</tr>
					);
				})
		);
	};

	let draftPlayer = () => {
		let { availPlayers } = props.draft;
		let newAvail = availPlayers;
		let [newDrafted] = newAvail.splice(
			newAvail.findIndex((elem) => elem.playerId === player.playerId),
			1
		);

		setPlayer({
			playerId: null,
			firstName: 'Select',
			lastName: 'Player',
			team: 'TM',
			position: 'pos',
		});
		filterPlayers('');

		props.draftPlayer(newDrafted, newAvail, []);
	};

	return (
		<div className='Manager'>
			<RunningDraftList />
			<div className='PlayerContainer'>
				<div>
					<select
						value={criteria}
						onChange={(ev) => {
							setCrit(ev.target.value);
						}}>
						<option value='name'>Name</option>
						<option value='team'>Team</option>
						<option value='position'>Pos.</option>
					</select>
					<input
						type='text'
						placeholder='search criteria'
						value={filter}
						onChange={(ev) => {
							setFilter(ev.target.value);
						}}
					/>
					<input
						type='submit'
						value='search'
						onClick={(ev) => {
							filterPlayers(filter);
						}}
					/>
					<input
						type='button'
						value='reset'
						onClick={(ev) => {
							setCrit('name');
							setFilter('');
							filterPlayers('');
						}}
					/>
				</div>
				<div className='PlayersBox'>
					<table className='PlayersTable'>
						<thead>
							<tr>
								<th>ADP</th>
								<th>Name</th>
								<th>Team</th>
								<th>Pos.</th>
							</tr>
						</thead>
						{availPlayers}
					</table>
				</div>
				<div id='inputBox'>
					<table>
						<thead>
							<tr>
								<th>Round</th>
								<th>Pick</th>
								<th>Player</th>
							</tr>
						</thead>
						<tr>
							<td>
								<input className='pickInput' type='number' value={round} />
							</td>
							<td>
								<input className='pickInput' type='number' value={pick} />
							</td>
							<td>{`${player.firstName} ${player.lastName} (${player.team}, ${player.position})`}</td>
						</tr>
					</table>
					<input type='button' value='Submit' onClick={() => draftPlayer()} />
				</div>
			</div>
		</div>
	);
}

let mapStateToProps = (state) => state;

export default connect(mapStateToProps, { getPlayers, draftPlayer })(Manager);
