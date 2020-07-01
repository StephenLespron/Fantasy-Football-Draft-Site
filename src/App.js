import React, { useEffect } from 'react';
import axios from 'axios';
import { getUser } from './ducks/userReducer';
import routes from './routes';
import Header from './components/Header/Header';
import './App.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

function App(props) {
	useEffect(() => {
		axios
			.get('auth/getUser')
			.then(async (res) => {
				await props.getUser(res.data);
				props.history.push(props.location.pathname);
			})
			.then((err) => console.log(err));
	}, []);

	return (
		<div className='App'>
			<Header />
			{routes}
		</div>
	);
}

let mapStateToProps = (state) => state;

export default connect(mapStateToProps, { getUser })(withRouter(App));
