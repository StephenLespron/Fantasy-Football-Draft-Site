import React, { Component } from 'react';
import axios from 'axios';

export default class DraftBoard extends Component {
	constructor() {
		super();
		this.state = {
			players: [],
		};
	}

	componentDidMount() {
		axios
			.post('api/players')
			.then((res) =>
				this.setState({
					players: res.data,
				})
			)
			.catch((err) => err.response.data);
	}

	createDB() {
		let board = [];

		for (let i = 0; i < 16; i++) {
			let picks = [];
			console.log(this.state.players);

			for (let j = i * 12 + 1; j < i * 12 + 13; j++) {
				let { firstName, lastName, team, position } = this.state.players[j - 1];
				if (j % 2 === 0) {
					picks.push(
						<td className='grey-background'>{`${firstName} ${lastName}\n${team} ${position}`}</td>
					);
				} else {
					picks.push(
						<td>{`${firstName} ${lastName}\n${team} ${position}`}</td>
					);
				}
			}
			//Create the parent and add the children
			board.push(
				<tr>
					<td className='rdColumn'>{i + 1}</td>
					{picks}
				</tr>
			);
		}
		return board;
	}

	render() {
		return (
			<div>
				<text className='new-pick-alert pop-up-ani'>
					Stephen Selects:
					<text className='new-pick-alert2'>{`\nDalvin Cook\nMIN (RB)`}</text>
				</text>
				<table>
					<tr id='teamNames'>
						<th className='rdColumn'>Rd</th>
						<th>Stephen</th>
						<th>Daniel</th>
						<th>Steve</th>
						<th>Matt</th>
						<th>Kylee</th>
						<th>Greg</th>
						<th>Josh</th>
						<th>Ryan</th>
						<th>Kevin</th>
						<th>Trevor</th>
						<th>Travis</th>
						<th>Jared</th>
					</tr>
					{this.createDB()}
				</table>
			</div>
		);
	}
}
