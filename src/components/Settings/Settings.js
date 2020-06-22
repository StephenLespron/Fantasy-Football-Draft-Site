import React, { useState } from 'react';
import SettingsDisplay from './SettingsDisplay';
import SettingsForm from './SettingsForm';
import { connect } from 'react-redux';
import './Settings.css';

function Settings(props) {
	const [isEditing, toggleIsEditing] = useState(false);

	return (
		<div className='Settings'>
			<div id='setBox'>
				{!isEditing ? (
					<SettingsDisplay />
				) : (
					<SettingsForm toggleIsEditing={toggleIsEditing} />
				)}
				<input
					id='editBtn'
					type='button'
					value={isEditing ? 'Cancel' : 'Edit Info'}
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
