import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { logout } from '../../ducks/userReducer';
import './Settings.css';

function SettingsDisplay(props) {
	const [deleting, toggleDeleting] = useState(false);

	const deleteUser = (ev) => {
		ev.preventDefault();
		axios
			.delete(`auth/deleteUser/${props.user.userId}`)
			.then((res) => {
				props.logout();
				props.history.push('/');
			})
			.catch((err) => alert(err.response.data));
	};
	return (
		<div className='SettingsDisplay'>
			<input
				id='deleteBtn'
				value={!deleting ? 'Delete Account' : 'Go Back'}
				type='button'
				onClick={() => toggleDeleting(!deleting)}
			/>
			<p>Username: {props.user.username}</p>
			<p>Email: {props.user.email}</p>
			<p>Password: ************</p>
			<div
				id='confirmDelete'
				style={!deleting ? { display: 'none' } : { display: 'flex' }}>
				<span>
					Are you sure? Once an account is deleted, all coinciding data will be
					lost.
				</span>
				<input
					id='confirmBtn'
					value='Confirm'
					type='button'
					onClick={(ev) => deleteUser(ev)}
				/>
			</div>
		</div>
	);
}

let mapStateToProps = (state) => state;

export default connect(mapStateToProps, { logout })(
	withRouter(SettingsDisplay)
);
