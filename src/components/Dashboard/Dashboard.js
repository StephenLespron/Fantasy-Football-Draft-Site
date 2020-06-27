import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../../ducks/userReducer';
import { connect } from 'react-redux';
import axios from 'axios';

function Dashboard(props) {
	const [drafts, setDrafts] = useState([]);

	useEffect(() => {
		axios
			.get(`api/drafts/${props.user.userId}`)
			.then((res) => {
				setDrafts(
					res.data.map((el) => {
						let date = new Date(el.date);
						return (
							<div key={el.draftId}>
								<p>Draft: #{`${el.draftId}`}</p>
								<p>
									Date:
									{` ${
										date.getMonth() + 1
									}-${date.getDate()}-${date.getFullYear()}`}
								</p>
								<Link to={`/draft/${el.draftId}/manager`}>
									<input type='button' value='Open Draft' />
								</Link>
								<input type='button' value='Email Results' />
							</div>
						);
					})
				);
			})
			.catch((err) => console.log('did not get drafts'));
	}, []);

	return <div>{drafts}</div>;
}

let mapStateToProps = (state) => {
	return { user: state.user };
};

export default connect(mapStateToProps, { getUser })(Dashboard);
