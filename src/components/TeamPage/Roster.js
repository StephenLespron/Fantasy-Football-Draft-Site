import React, { useState, useEffect } from 'react';

function Roster(props) {
	const [displayArr, setDisplay] = useState([]);

	function displayRoster() {
		let arr;
		let { roster } = props;

		let qb = roster
			.filter((el) => el.position === 'QB')
			.sort((a, b) => a.ppg > b.ppg);

		let rb = roster
			.filter((el) => el.position === 'RB')
			.sort((a, b) => a.ppg > b.ppg);
		let wr = roster
			.filter((el) => el.position === 'WR')
			.sort((a, b) => a.ppg > b.ppg);
		let te = roster
			.filter((el) => el.position === 'TE')
			.sort((a, b) => a.ppg > b.ppg);
		let def = roster
			.filter((el) => el.position === 'D/ST')
			.sort((a, b) => a.ppg > b.ppg);
		let k = roster
			.filter((el) => el.position === 'K')
			.sort((a, b) => a.ppg > b.ppg);

		let flex = [...rb.slice(2), ...wr.slice(2), ...te.slice(1)].sort(
			(a, b) => a.ppg > b.ppg
		);

		arr = [qb[0], rb[0], rb[1], wr[0], wr[1], te[0], flex[0]];
		console.log('roster ordered:', arr);

		arr = arr.map((el, ind) => {
			if (el) {
				return (
					<p key={`12${el.playerId}`}>
						{el.firstName} {el.lastName}
					</p>
				);
			} else {
				console.log('map2');
				return <p key={`12${ind}`}>undrafted</p>;
			}
		});

		setDisplay(arr);
	}
	useEffect(() => {
		displayRoster();
	}, [props.roster]);

	return (
		<div>
			<div>
				<p>QB: </p>
				<p>RB: </p>
				<p>RB: </p>
				<p>WR: </p>
				<p>WR: </p>
				<p>TE: </p>
				<p>FLEX: </p>
				<p>D/ST: </p>
				<p>K: </p>
			</div>
			<div>{displayArr}</div>
		</div>
	);
}

export default Roster;
