import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { startDraft } from '../../ducks/draftReducer';
import './NewDraft.css';

function NewDraft(props) {
	const [teams, setTeams] = useState(new Array(12));

	useEffect(() => {
		let newArr = [...teams];
		let teamNum = 0;

		newArr = newArr.map((elem) => {
			teamNum++;
			return { teamName: ``, keeperRound: 1, draftOrder: teamNum };
		});
		setTeams(newArr);
	}, []);

	let updateTeams = (ev, ind) => {
		ev.preventDefault();

		let { name, value } = ev.target;
		let newArr = [...teams];

		newArr[ind][name] = +value ? +value : value;

		setTeams(newArr);
	};

	let startDraft = (ev) => {
		ev.preventDefault();
		axios
			.post(`api/createDraft/${props.user.userId}`, { teams: [...teams] })
			.then((res) => {
				props.startDraft(res.data.draftId, res.data.teams);
				props.history.push('/manager');
			})
			.catch((err) => console.log(err));
	};

	let teamsListed = teams.map((elem, ind) => (
		<div key={ind} className='teamBox'>
			<p style={{ width: '25px', textAlign: 'right' }}>#{ind + 1} </p>
			<p>Name: </p>
			<input
				type='text'
				value={elem.teamName}
				placeholder={`Team #${ind + 1}`}
				name='teamName'
				onChange={(ev) => updateTeams(ev, ind)}
			/>
			<p>Keeper Round: </p>
			<input
				className='keeperInput'
				type='text'
				value={elem.keeperRound}
				name='keeperRound'
				min='1'
				max='16'
				onChange={(ev) => updateTeams(ev, ind)}
			/>
		</div>
	));

	return (
		<div className='NewDraft'>
			<div id='NDInputBox'>
				<input
					id='startBtn'
					type='button'
					value='Start Draft'
					onClick={(ev) => startDraft(ev)}
				/>
				<div className='teamMasterBox'>{teamsListed.slice(0, 6)}</div>
				<div className='teamMasterBox'>{teamsListed.slice(6, 12)}</div>
			</div>
		</div>
	);
}

let mapStateToProps = (state) => state;
export default connect(mapStateToProps, { startDraft })(NewDraft);
