import React, { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import './Settings.css';

function SettingsForm(props) {
	return (
		<div className='SettingsForm'>
			<div>
				<p>Username: </p>{' '}
				<input
					type='text'
					value={props.username}
					onChange={(ev) => props.setUser(ev.target.value)}
				/>
			</div>
			<div>
				<p>Email: </p>{' '}
				<input
					type='email '
					value={props.email}
					onChange={(ev) => props.setEmail(ev.target.value)}
				/>
			</div>
			<div>
				<p>Existing Password: </p>{' '}
				<input
					type='password'
					value={props.oldPassword}
					onChange={(ev) => props.setOldPass(ev.target.value)}
				/>
			</div>
			<p style={{ fontSize: '11px' }}>
				New password is not required. Leave blank if password is not changing.
			</p>
			<div>
				<p>New Password: </p>{' '}
				<input
					type='password'
					value={props.newPassword}
					onChange={(ev) => props.setNewPass(ev.target.value)}
				/>
			</div>
		</div>
	);
}

let mapStateToProps = (state) => state;

export default connect(mapStateToProps)(SettingsForm);
