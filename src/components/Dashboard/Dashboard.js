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
			.get(`api/getTeams/${draftId}`)
			.then((res) => {
				props.startDraft(res.data);
			})
			.catch((err) => alert(err.response.data));
	}

	useEffect(() => {
		axios
			.get(`api/drafts/${props.user.userId}`)
			.then((res) => {
				let arr = res.data.map((el) => {
					let date = new Date(el.date);
					return (
						<div key={el.draft_id}>
							<h4>Draft #{el.draft_id}</h4>
							<h4>
								Date:{' '}
								{`${
									date.getMonth() + 1
								}-${date.getDate()}-${date.getFullYear()}`}
							</h4>
							<Link to={`/draft/${el.draft_id}/manager`}>
								<input
									type='button'
									value='Open Draft'
									onClick={() => getTeams(el.draft_id)}
								/>
							</Link>
							<input type='button' value='Send Email' />
						</div>
					);
				});

				setDrafts(arr);
			})
			.catch((err) => 'did not get drafts');
	}, []);

	return (
		<div className='Dashboard'>
			<div>{drafts}</div>
		</div>
	);
}

let mapStateToProps = (state) => state;

export default connect(mapStateToProps, { startDraft })(Dashboard);
