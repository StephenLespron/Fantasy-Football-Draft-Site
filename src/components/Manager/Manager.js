/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
	const [onDeckArr, setOnDeck] = useState([]);
	const [criteria, setCrit] = useState('name');
	const [player, setPlayer] = useState({
		playerId: null,
		firstName: 'Select',
		lastName: 'Player',
		team: 'TM',
		position: 'pos',
	});

	let draftPick = round % 2 === 1 ? pick : 13 - pick;

	useEffect(() => {
		if (props.draft.availPlayers) {
			if (props.draft.availPlayers.length === 0) {
				axios
					.post(`api/players/${props.match.params.draftId}`)
					.then((res) => {
						console.log('initial reload');
						const { drafted, avail } = res.data;
						props.getPlayers(drafted, avail);
						setAvailPlayers(
							res.data.avail.map((elem) => {
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
					.catch((err) => alert(`failed`));
			} else {
				filterPlayers('');
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.draft.availPlayers]);

	let filterPlayers = (sort) => {
		let sortedPlayers = props.draft.availPlayers.sort((a, b) =>
			a.adp > b.adp ? 1 : -1
		);
		setAvailPlayers(
			sortedPlayers
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
		let { availPlayers, teams } = props.draft;
		let newAvail = availPlayers;

		let [newDrafted] = newAvail.splice(
			newAvail.findIndex((elem) => elem.playerId === player.playerId),
			1
		);

		let { team_name, team_id } = teams[
			teams.findIndex((elem) => elem.draft_order === draftPick)
		];

		newDrafted.teamId = team_id;

		newDrafted.draftPickIndex = (round - 1) * 12 + pick;

		setPlayer({
			playerId: null,
			firstName: 'Select',
			lastName: 'Player',
			team: 'TM',
			position: 'pos',
		});

		// setRound(pick === 12 ? round + 1 : round);
		// setPick(pick === 12 ? 1 : pick + 1);
		filterPlayers('');

		let {
			playerId: player_id,
			firstName: first_name,
			lastName: last_name,
			team,
			position,
			draftPickIndex: draft_pick_index,
			adp,
			ppg,
		} = newDrafted;
		props.draftPlayer(
			{
				draft_pick_index,
				first_name,
				last_name,
				player_id,
				position,
				team,
				team_name,
				adp,
				ppg,
			},
			newAvail
		);

		console.log({ ...newDrafted });
		axios
			.post('api/addPlayer', { ...newDrafted })
			.then(() => 'success')
			.catch((err) => err.response.data);
	};

	let onDeck = () => {
		let arr = [];
		let trackRd = round;
		let trackDP = trackRd % 2 === 1 ? pick : 13 - pick;

		for (let i = 0; i < 3; i++) {
			let trackRdLoop = pick + i > 12 ? round + 1 : round;
			let trackDPLoop;

			switch (trackRdLoop % 2 === 1) {
				case true:
					switch (pick + i > 12) {
						case true:
							trackDPLoop = 25 - (pick + i);
							break;
						case false:
							trackDPLoop = pick + i;
							break;
						default:
							console.log(`err`);
					}
					break;
				case false:
					switch (pick + i > 12) {
						case true:
							trackDPLoop = pick + i - 12;
							break;
						case false:
							trackDPLoop = pick + i;
							break;
						default:
							console.log(`err`);
					}
					break;
				default:
					console.log(`err`);
			}
			arr.push(
				props.draft.teams[
					props.draft.teams.findIndex(
						(elem) => elem.draft_order === trackDPLoop
					)
				]
			);
		}

		setOnDeck(
			arr.map((elem, ind) => {
				return (
					<div key={pick + round + ind}>
						<p>{ind > 0 ? `On Deck #${ind}` : `On The Clock`}</p>
						<p>Pick: {(trackRd - 1) * 12 + trackDP + ind}</p>
						<p>{elem.team_name}</p>
					</div>
				);
			})
		);
	};

	useEffect(() => {
		let { draftedPlayers } = props.draft;

		let nextPick =
			draftedPlayers
				.sort((a, b) => {
					return a.draft_pick_index > b.draft_pick_index ? 1 : -1;
				})
				.findIndex((el, ind) => el.draft_pick_index !== ind + 1) + 1;

		if (!nextPick) {
			nextPick = draftedPlayers.length + 1;
		}

		let nextRound = Math.ceil(nextPick / 12);

		setPick(nextPick);
		setRound(nextRound);

		console.log(
			draftedPlayers.sort((a, b) => {
				return a.draft_pick_index > b.draft_pick_index ? 1 : -1;
			})
		);

		console.log(nextRound, nextPick);
	}, [props.draft.draftedPlayers]);

	useEffect(() => {
		if (pick) {
			if (availPlayers.length > 0) {
				if (pick >= 1 && pick <= 12) {
					onDeck();
				}
			}
		}
	}, [pick]);

	return (
		<div className='Manager'>
			<p>
				Go to
				{`localhost:3000/#/draft/${props.match.params.draftId}/board`} to view
				the draftboard.
			</p>
			<Link to={`/draft/${props.match.params.draftId}/board`} target='_blank'>
				<p> or Click here!</p>
			</Link>
			<div>
				<RunningDraftList />
				<div className='onDeck'>{onDeckArr}</div>
			</div>
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
						<tbody>{availPlayers}</tbody>
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
						<tbody>
							<tr>
								<td>
									<input
										className='pickInput'
										type='number'
										min='1'
										max='16'
										value={+round}
										onChange={(ev) => setRound(+ev.target.value)}
									/>
								</td>
								<td>
									<input
										className='pickInput'
										type='number'
										min={1}
										max={12}
										value={+pick}
										onChange={(ev) => setPick(+ev.target.value)}
									/>
								</td>
								<td>{`${player.firstName} ${player.lastName} (${player.team}, ${player.position})`}</td>
							</tr>
						</tbody>
					</table>
					<input type='button' value='Submit' onClick={() => draftPlayer()} />
				</div>
			</div>
		</div>
	);
}
let mapStateToProps = (state) => state;

export default connect(mapStateToProps, { getPlayers, draftPlayer })(Manager);
