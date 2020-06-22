import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import './Settings.css';

function SettingsDisplay(props) {
	return (
		<div className='SettingsDisplay'>
			<p>Username: {props.user.username}</p>
			<p>Email: {props.user.email}</p>
			<p>Password: ************</p>
		</div>
	);
}

let mapStateToProps = (state) => state;

export default connect(mapStateToProps)(SettingsDisplay);
