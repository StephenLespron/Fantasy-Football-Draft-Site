import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { login, getUser } from '../../ducks/userReducer';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import LoginForm from './LoginForm';
import Register from './RegisterForm';
import TwitterContainer from './TwitterContainer';
import './Landing.css';

function Landing(props) {
	const [username, setUser] = useState('');
	const [password, setPass] = useState('');
	const [email, setEmail] = useState('');
	const [needAcct, setNeedAcct] = useState(false);
	const [twitter, setTwitter] = useState(false);
	const [draftTools, toggleDraftTools] = useState(false);
	const [draftId, setDraftId] = useState(0);

	let login = (ev) => {
		ev.preventDefault();
		axios
			.post('auth/login', { username, password })
			.then(async (res) => {
				const { userId, email } = res.data;
				await props.login({ userId, username, email });
				props.history.push('/dashboard');
			})
			.catch((err) => {
				return alert(err.response.data);
			});
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

	useEffect(() => {
		if (props.user.isLoggedIn) {
			props.history.push('/dashboard');
		} else if (typeof props.user.isLoggedIn === 'boolean') {
			setTwitter(true);
		}
	}, [props.user.isLoggedIn]);

	return (
		<div className='Landing'>
			<button
				id='toolsBtn'
				onClick={() => {
					toggleDraftTools(!draftTools);
				}}>
				Draft Tools
			</button>
			<h1>Play 4 Keeps Fantasy Football Draft</h1>
			<form
				className={!draftTools ? 'draftTools' : 'draftTools draftToolsOpen'}>
				<div
					style={{
						display: `flex`,
						width: '100%',
						justifyContent: 'center',
					}}>
					<p>Draft Id:</p>
					<input
						style={{ width: '25px', textAlign: 'center' }}
						type='number'
						value={draftId}
						onChange={(ev) => setDraftId(ev.target.value)}
					/>
				</div>
				<div
					style={{
						display: `flex`,
						width: '100%',
						justifyContent: 'space-evenly',
					}}>
					<Link to={`/draft/${draftId}/teams`}>
						<button>Team View</button>
					</Link>
					<Link to={`/draft/${draftId}/board`}>
						<button>Draftboard</button>
					</Link>
				</div>
			</form>
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
			{twitter ? <TwitterContainer /> : <></>}
		</div>
	);
}

let mapStateToProps = (state) => state;

export default connect(mapStateToProps, { login, getUser })(Landing);
