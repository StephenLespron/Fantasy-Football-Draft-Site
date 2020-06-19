import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { login, getUser } from '../../ducks/reducer';
import { connect } from 'react-redux';
import './Landing.css';

function Landing(props) {
	const [username, setUser] = useState('');
	const [password, setPass] = useState('');
	const [email, setEmail] = useState('');

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

	return (
		<div className='Landing'>
			<h1>Play 4 Keeps Fantasy Football Draft</h1>
			<div className='loginBox'>
				<h4>Login</h4>
				<form onSubmit={(ev) => login(ev)}>
					<div>
						<span>Username: </span>
						<input
							className='input'
							type='text'
							placeholder='username'
							name='username'
							value={username}
							onChange={(ev) => setUser(ev.target.value)}
						/>
					</div>
					<div>
						<span>Password: </span>
						<input
							className='input'
							type='password'
							placeholder='password'
							name='password'
							value={password}
							onChange={(ev) => setPass(ev.target.value)}
						/>
					</div>
					<div id='authBtnBox'>
						<input className='authBtn' type='submit' value='Login' />
					</div>
				</form>
				<span>
					Need an account?<Link>Click here to register</Link>
				</span>
			</div>
			{/* <a
				className='twitter-timeline'
				href='https://twitter.com/FantasyPros'
				data-tweet-limit='5'
				data-width='399'>
				Tweets by Fantasy Pros
			</a>
			<script
				async
				src='http://platform.twitter.com/widgets.js'
				charSet='utf-8'></script> */}
		</div>
	);
}

let mapStateToProps = (state) => state;

export default connect(mapStateToProps, { login, getUser })(Landing);
