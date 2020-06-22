import React, { useState } from 'react';
import { login } from '../../ducks/reducer';
import axios from 'axios';
import { connect } from 'react-redux';
import './Settings.css';

function SettingsForm(props) {
	const [username, setUser] = useState(props.user.username);
	const [email, setEmail] = useState(props.user.email);
	const [oldPassword, setOldPass] = useState('');
	const [newPassword, setNewPass] = useState('');

	const updateUser = (ev) => {
		ev.preventDefault();
		axios
			.put(`auth/updateUser/${props.user.userId}`, {
				username,
				email,
				oldPassword,
				newPassword,
			})
			.then((res) => {
				props.login({ userId: props.user.userId, username, email });
				props.toggleIsEditing(false);
			})
			.catch((err) => alert(err.response.data));
	};
	return (
		<div className='SettingsForm'>
			<div>
				<p>Username: </p>{' '}
				<input
					type='text'
					value={username}
					onChange={(ev) => setUser(ev.target.value)}
				/>
			</div>
			<div>
				<p>Email: </p>{' '}
				<input
					type='email '
					value={email}
					onChange={(ev) => setEmail(ev.target.value)}
				/>
			</div>
			<div>
				<p>Existing Password: </p>{' '}
				<input
					type='password'
					value={oldPassword}
					onChange={(ev) => setOldPass(ev.target.value)}
				/>
			</div>
			<p style={{ fontSize: '11px' }}>
				New password is not required. Leave blank if password is not changing.
			</p>
			<div>
				<p>New Password: </p>{' '}
				<input
					type='password'
					value={newPassword}
					onChange={(ev) => setNewPass(ev.target.value)}
				/>
			</div>
			<input
				id='updateBtn'
				type='button'
				value='Update'
				onClick={(ev) => updateUser(ev)}
			/>
		</div>
	);
}

let mapStateToProps = (state) => state;

export default connect(mapStateToProps, { login })(SettingsForm);
