import React, { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getTeams } from '../../ducks/draftReducer';
import './NewDraft.css';

function NewDraft(props) {
	const [teams, setTeams] = useState(new Array(12));

	let startDraft = (ev) => {
		ev.preventDefault();
		axios
			.post(`api/createDraft/${props.user.userId}`, { teams: [...teams] })
			.then((res) => {
				console.log(res.data);
				props.getTeams(res.data.draftId, res.data.teams);
				// props.history.push('/settings');
				console.log(props.user);
			});
	};
	return (
		<div className='NewDraft'>
			<input type='button' onClick={(ev) => startDraft(ev)} />
		</div>
	);
}

let mapStateToProps = (state) => state;
export default connect(mapStateToProps, { getTeams })(NewDraft);
