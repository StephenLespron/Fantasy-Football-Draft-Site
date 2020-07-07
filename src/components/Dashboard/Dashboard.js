/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { startDraft } from '../../ducks/draftReducer';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './Dashboard.css';

function Dashboard(props) {
	const [drafts, setDrafts] = useState([]);

	function getTeams(draftId) {
		axios
			.get(`/api/getTeams/${draftId}`)
			.then((res) => {
				props.startDraft(res.data);
			})
			.catch((err) => alert(err.response.data));
	}

	function sendEmail(draftId) {
		const { username, email } = props.user;
		axios
			.post('sendEmail', { username, email, draftId })
			.then(() => alert('Email sent successfully!'))
			.catch((err) => alert(err.response.data));
	}

	useEffect(() => {
		axios
			.get(`/api/drafts/${props.user.userId}`)
			.then((res) => {
				let arr = res.data.map((el) => {
					let date = new Date(el.date);
					let month = date.getMonth() + 1;
					let day = date.getDate();
					let year = date.getFullYear();
					return (
						<div key={el.draft_id} className='draftBox'>
							<h4>Draft #{el.draft_id}</h4>
							<h4>Date: {`${month}-${day}-${year}`}</h4>
							<div id='buttonBox'>
								<Link to={`/draft/${el.draft_id}/manager`}>
									<input
										type='button'
										value='Open Draft'
										onClick={() => getTeams(el.draft_id)}
									/>
								</Link>
								<input
									type='button'
									value='Send Email'
									onClick={() => sendEmail(el.draft_id)}
								/>
							</div>
						</div>
					);
				});
				setDrafts(arr);
			})
			.catch((err) => 'did not get drafts');
	}, []);

	return (
		<div className='Dashboard'>
			<div>
				{drafts.length > 0 ? (
					drafts
				) : (
					<p id='noDrafts'>
						{`You have not started any drafts! \n Click new draft (top-right
						corner) to start one now.`}
					</p>
				)}
			</div>
		</div>
	);
}

let mapStateToProps = (state) => state;

export default connect(mapStateToProps, { startDraft })(Dashboard);
