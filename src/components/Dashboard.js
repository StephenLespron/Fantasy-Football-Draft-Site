import React from 'react';
// import { useState, useEffect } from 'react';
// import axios from 'axios';
import { getUser } from '../ducks/reducer';
import { connect } from 'react-redux';

function Dashboard(props) {
	// const [drafts, setDrafts] = useState([]);

	// useEffect(() => {
	// 	props.getUser();
	// 	setTimeout(
	// 		axios
	// 			.get(`api/drafts/${props.user.userId}`)
	// 			.then((res) => setDrafts(res.data))
	// 			.catch((err) => 'did not get drafts'),
	// 		0
	// 	);
	// }, []);

	return <div>dashboard.js</div>;
}

let mapStateToProps = (state) => state;

export default connect(mapStateToProps, { getUser })(Dashboard);
