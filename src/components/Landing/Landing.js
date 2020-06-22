import React, { useState } from 'react';
import axios from 'axios';
import { login, getUser } from '../../ducks/reducer';
import { connect } from 'react-redux';
import LoginForm from './LoginForm';
import Register from './RegisterForm';
import './Landing.css';

function Landing(props) {
	const [username, setUser] = useState('');
	const [password, setPass] = useState('');
	const [email, setEmail] = useState('');
	const [needAcct, setNeedAcct] = useState(false);

	let login = (ev) => {
		ev.preventDefault();
		axios
			.post('auth/login', { username, password })
			.then((res) => {
				const { userId, email } = res.data;
				props.login({ userId, username, email });
				props.history.push('/dashboard');
			})
			.catch((err) => alert(err.response.data));
	};

	let register = (ev) => {
		ev.preventDefault();
		axios
			.post('auth/register', { username, password, email })
			.then((res) => {
				const { userId, email } = res.data;
				props.login({ userId, username, email });
				props.history.push('/dashboard');
			})
			.catch((err) => alert(err.response.data));
	};

	return (
		<div className='Landing'>
			<h1>Play 4 Keeps Fantasy Football Draft</h1>
			<div className='loginBox'>
				{!needAcct ? (
					<LoginForm
						setUser={setUser}
						setPass={setPass}
						username={username}
						password={password}
						login={login}
						needAcct={setNeedAcct}
					/>
				) : (
					<Register
						setUser={setUser}
						setPass={setPass}
						setEmail={setEmail}
						username={username}
						password={password}
						email={email}
						register={register}
						needAcct={setNeedAcct}
					/>
				)}
			</div>
		</div>
	);
}

let mapStateToProps = (state) => state;

export default connect(mapStateToProps, { login, getUser })(Landing);
