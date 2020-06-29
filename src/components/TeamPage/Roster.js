import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

function Roster(props) {
	const [roster, setRoster] = useState(new Array(16));

	function buildRoster() {
		let players = props.draft.draftedPlayers
			.filter((el) => el.team_name === props.currentTeam)
			.sort((a, b) => (+a.ppg < +b.ppg ? -1 : 1));

		let sorted = {
			QB: [{ ppg: 0 }],
			RB: [{ ppg: 0 }, { ppg: 0 }],
			WR: [{ ppg: 0 }, { ppg: 0 }],
			TE: [{ ppg: 0 }],
			FLEX: [{ ppg: 0 }],
			DST: [{ ppg: 0 }],
			K: [{ ppg: 0 }],
			BENCH: [
				{ ppg: 0 },
				{ ppg: 0 },
				{ ppg: 0 },
				{ ppg: 0 },
				{ ppg: 0 },
				{ ppg: 0 },
				{ ppg: 0 },
			],
		};
		let { QB, RB, WR, TE, FLEX, DST, K, BENCH } = sorted;

		players.map((el) => {
			if (el.position === 'D/ST') {
				sorted['DST'].unshift(el);
			} else {
				sorted[el.position].unshift(el);
			}
		});

		let flex = [...RB.slice(2), ...WR.slice(2), ...TE.slice(1)].sort((a, b) =>
			+a.ppg < +b.ppg ? 1 : -1
		);

		sorted.FLEX.unshift(...flex);

		sorted.BENCH.unshift(
			...[
				...flex.slice(1),
				...QB.slice(1),
				...DST.slice(1),
				...K.slice(1),
			].sort((a, b) => (+a.ppg < +b.ppg ? 1 : -1))
		);

		let arr = [
			QB[0],
			RB[0],
			RB[1],
			WR[0],
			WR[1],
			TE[0],
			FLEX[0],
			DST[0],
			K[0],
			...BENCH,
		];

		arr = arr.slice(0, 16).map((el, ind) => {
			if (el.first_name) {
				return (
					<p
						key={
							el.first_name + el.last_name
						}>{`${el.first_name} ${el.last_name} (ppg: ${el.ppg})`}</p>
				);
			} else {
				return <p key={ind}>---------------</p>;
			}
		});

		setRoster(arr);
	}

	useEffect(() => {
		buildRoster();
	}, [props.draft.draftedPlayers, props.currentTeam]);

	return (
		<div className='Roster'>
			<div>
				<p>QB</p>
				<p>RB</p>
				<p>RB</p>
				<p>WR</p>
				<p>WR</p>
				<p>TE</p>
				<p>FLEX</p>
				<p>D/ST</p>
				<p>K</p>
				<p>BENCH</p>
				<p>BENCH</p>
				<p>BENCH</p>
				<p>BENCH</p>
				<p>BENCH</p>
				<p>BENCH</p>
				<p>BENCH</p>
			</div>
			<div>{roster}</div>
		</div>
	);
}

let mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Roster);
