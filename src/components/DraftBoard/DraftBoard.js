/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import uIfx from 'uifx';
import cheer from './cheer.mp3';
import axios from 'axios';
import './DraftBoard.css';

function DraftBoard(props) {
	const [loading, setLoading] = useState(false);
	const alert = new uIfx(cheer, { volume: 1 });
	const [newPick, setNewPick] = useState();

	const [players, setPlayers] = useState([]);
	const [teams, setTeams] = useState(new Array(12));
	const [teamNames, setTeamNames] = useState(new Array(12));
	const [board, setBoard] = useState(new Array(16));

	function getNewPlayers(arg) {
		let length = arg;
		axios
			.get(`api/draftedPlayers/${props.match.params.draftId}`)
			.then((res) => {
				console.log(
					`arg: ${arg}`,
					`players: ${length}`,
					`res.data: ${res.data.players.length}`
				);
				if (length !== res.data.players.length) {
					length = res.data.players.length;

					let sort = res.data.players.slice().sort((a, b) => {
						console.log(a.timestamp, b.timestamp);

						return +a.timestamp < +b.timestamp ? 1 : -1;
					}, 0);
					console.log(sort[0], sort[sort.length - 1], Date.now());
					setNewPick(sort[0]);

					setPlayers(res.data.players);
				}
			});
		setTimeout(() => {
			getNewPlayers(length);
		}, 15000);
	}

	useEffect(() => {
		axios
			.get(`api/draftedPlayers/${props.match.params.draftId}`)
			.then(async (res) => {
				setTeams(res.data.teams);
				getNewPlayers(res.data.players.length);
			})
			.catch((err) => console.log(err.response.data));
	}, []);

	useEffect(() => {
		if (players) {
			createDB();
			if (newPick) {
				console.log(newPick);
				setLoading(true);
				alert.play();
				setTimeout(() => {
					setLoading(false);
				}, 10000);
			}
		}
	}, [players]);

	useEffect(() => {
		let arr = teams.map((el) => el.team_name);

		setTeamNames(arr);
	}, [teams]);

	async function createDB() {
		let arr = new Array(192);
		await players.map((el) => {
			let ind = el.draft_pick_index - 1;
			let elem = (
				<td
					key={
						el.playerId
					}>{`${el.first_name} ${el.last_name}\n${el.team} ${el.position}`}</td>
			);
			arr.splice(ind, 1, elem);
		});

		for (let i = 0; i < arr.length; i++) {
			let elem = <td key={+`0000${i}`}>{`${''} ${''}\n${''} ${''}`}</td>;
			if (!arr[i]) {
				arr.splice(i, 1, elem);
			}
		}

		let board = [];
		for (let i = 0; i < 16; i++) {
			let picks = [];
			for (let j = i * 12; j < i * 12 + 12; j++) {
				if (i % 2 === 0) {
					picks.push([arr[j]]);
				} else {
					picks.unshift([arr[j]]);
				}
			}
			//Create the parent and add the children
			board.push(
				<tr key={+`0001${i}`}>
					<td key={+`0002${i}`} className='rdColumn'>
						{i + 1}
					</td>
					{picks}
				</tr>
			);
		}

		setBoard(board);
	}

	return (
		<div className='DraftBoard'>
			{players.length > 0 ? (
				<span
					className='new-pick-alert pop-up-ani'
					style={!loading ? { display: 'none' } : {}}>
					{`${newPick.team_name}`} Selects:
					<p className='new-pick-alert2'>{`\n${newPick.first_name} ${newPick.last_name}\n${newPick.team}, ${newPick.position}`}</p>
				</span>
			) : (
				''
			)}
			<table>
				<thead>
					<tr id='teamNames'>
						<th className='rdColumn'>Rd</th>
						<th>{teamNames[0]}</th>
						<th>{teamNames[1]}</th>
						<th>{teamNames[2]}</th>
						<th>{teamNames[3]}</th>
						<th>{teamNames[4]}</th>
						<th>{teamNames[5]}</th>
						<th>{teamNames[6]}</th>
						<th>{teamNames[7]}</th>
						<th>{teamNames[8]}</th>
						<th>{teamNames[9]}</th>
						<th>{teamNames[10]}</th>
						<th>{teamNames[11]}</th>
					</tr>
				</thead>
				<tbody>{board}</tbody>
			</table>
		</div>
	);
}

export default DraftBoard;
