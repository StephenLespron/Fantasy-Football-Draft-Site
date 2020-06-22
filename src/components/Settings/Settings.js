import React, { useState } from 'react';
import { login, logout } from '../../ducks/reducer';
import SettingsDisplay from './SettingsDisplay';
import SettingsForm from './SettingsForm';
import { connect } from 'react-redux';
import './Settings.css';

function Settings(props) {
	const [isEditing, toggleIsEditing] = useState(false);
	const [username, setUser] = useState(props.user.username);
	const [email, setEmail] = useState(props.user.email);
	const [oldPassword, setOldPass] = useState();
	const [newPassword, setNewPass] = useState();

	let updateUser = () => {};

	return (
		<div className='Settings'>
			<div id='setBox'>
				{!isEditing ? (
					<SettingsDisplay />
				) : (
					<SettingsForm
						username={username}
						email={email}
						oldPassword={oldPassword}
						newPassword={newPassword}
						setUser={setUser}
						setEmail={setEmail}
						setOldPass={setOldPass}
						setNewPass={setNewPass}
					/>
				)}
				<input
					id='editBtn'
					type='button'
					value={isEditing ? 'Update' : 'Edit Info'}
					onClick={() => {
						toggleIsEditing(!isEditing);
					}}
				/>
			</div>
		</div>
	);
}

let mapStateToProps = (state) => state;

export default connect(mapStateToProps, {})(Settings);
