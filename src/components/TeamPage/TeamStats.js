import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Bar } from 'react-chartjs-2';

function TeamStats(props) {
	const [data, setData] = useState([]);

	function createData() {
		let teamsArr = [];

		let ordering = {}, // map for efficient lookup of sortIndex
			sortOrder = ['QB', 'RB', 'WR', 'TE', 'D/ST', 'K'];
		for (let i = 0; i < sortOrder.length; i++) ordering[sortOrder[i]] = i;

		props.draft.teams.map((el) => {
			teamsArr.push({
				team_name: el.team_name,
				players: props.draft.draftedPlayers
					.filter((el2) => el.team_name === el2.team_name)
					.sort(
						(a, b) =>
							ordering[a.position] - ordering[b.position] || +b.ppg - +a.ppg
					),
			});
		});

		for (let j = 0; j < 12; j++) {
			let currentTeam = [];
			let index = 0;
			let positions = ['QB', 'RB', 'RB', 'WR', 'WR', 'TE', 'D/ST', 'K', 'FLEX'];
			for (let i = 0; i < 9; i++) {
				let arr = teamsArr[j].players;
				let pos = positions[i];
				if (pos === 'FLEX') {
					arr.filter(
						(el) =>
							el.position === 'RB' ||
							el.position === 'WR' ||
							el.position === 'TE'
					);
					index = 5;
				} else {
					index = arr.map((el) => el.position).indexOf(pos, index);
				}

				if (arr[index]) {
					currentTeam.push({ position: pos, ppg: +arr[index].ppg });
				} else {
					currentTeam.push({ position: pos, ppg: 0 });
				}

				index++;
			}
			teamsArr[j].players = currentTeam;
		}

		let currentTeamIndex = teamsArr.findIndex(
			(el) => el.team_name === props.currentTeam
		);

		console.log(currentTeamIndex);

		let [currentTeamData] = teamsArr.splice(currentTeamIndex, 1);

		currentTeamData.players = currentTeamData.players.map((el) => el.ppg);
		console.log(currentTeamData);

		let otherTeamsData = teamsArr[0].players.map((el, ind) => {
			let denom = 0;

			teamsArr.map((el2) => {
				el2.players[ind].ppg > 0 ? denom++ : (denom = denom);
			});

			return (
				(el.ppg +
					teamsArr[1].players[ind].ppg +
					teamsArr[2].players[ind].ppg +
					teamsArr[3].players[ind].ppg +
					teamsArr[4].players[ind].ppg +
					teamsArr[5].players[ind].ppg +
					teamsArr[6].players[ind].ppg +
					teamsArr[7].players[ind].ppg +
					teamsArr[8].players[ind].ppg +
					teamsArr[9].players[ind].ppg +
					teamsArr[10].players[ind].ppg) /
				denom
			);
		});

		let labels = ['QB', 'RB1', 'RB2', 'WR1', 'WR2', 'TE', 'D/ST', 'K', 'FLEX'];
		let datasets = [
			{
				label: `${currentTeamData.team_name}`,
				backgroundColor: 'rgb(89, 191, 63)',
				borderColor: 'rgba(0,0,0,1)',
				borderWidth: 2,
				data: currentTeamData.players,
			},
			{
				label: `League Average`,
				backgroundColor: 'rgb(178, 15, 15)',
				borderColor: 'rgba(0,0,0,1)',
				borderWidth: 2,
				data: otherTeamsData,
			},
		];

		setData({ labels, datasets });
	}

	useEffect(() => {
		if (props.currentTeam && props.draft.teams.length > 0) {
			createData();
		}
	}, [props.draft.draftedPlayers, props.currentTeam]);

	return (
		<div className='TeamStats'>
			<Bar
				data={data}
				width={100}
				options={{
					title: {
						display: true,
						text: 'Positional Ranking',
						fontSize: 20,
					},
					legend: {
						display: true,
						position: 'top',
					},
					maintainAspectRatio: false,
				}}
			/>
		</div>
	);
}

let mapStateToProps = (state) => state;

export default connect(mapStateToProps)(TeamStats);
