import React, { useEffect } from 'react';
import axios from 'axios';
import { getUser, login } from './ducks/userReducer';
import routes from './routes';
import Header from './components/Header/Header';
import './App.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

function App(props) {
	useEffect(() => {
		axios
			.get('/auth/getUser')
			.then(async (res) => {
				await props.login(res.data);
				props.history.push(props.location.pathname);
			})
			.catch(() => {
				props.getUser();
			});
	}, []);

	return (
		<div className='App'>
			<Header />
			{routes}
		</div>
	);
}

let mapStateToProps = (state) => state;

export default connect(mapStateToProps, { getUser, login })(withRouter(App));
