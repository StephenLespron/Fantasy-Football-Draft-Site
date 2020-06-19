import React, { useEffect, useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout, getUser } from '../../ducks/reducer';
import menu from './hamburger.png';
import logo from './PngItem_5959932.png';
import './Header.css';

function Header(props) {
	let [clickedMenu, setClicked] = useState(false);

	let { getUser } = props;

	useEffect(() => {
		getUser();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	let logout = () => {
		props.logout();
		props.history.push('/');
	};

	function toggleClicked() {
		if (clickedMenu) {
			setClicked(false);
		} else {
			setClicked(true);
		}
	}

	return (
		<div
			className='Header'
			style={!props.isLoggedIn ? { display: 'none' } : {}}>
			<div>
				<img
					alt='logo'
					src={logo}
					style={{ height: '70px', transform: 'scaleX(-1)' }}
				/>
				<h3>Welcome, {props.user.username}</h3>
				<input type='button' value='Logout' onClick={() => logout()} />
			</div>
			<div>
				<div style={!clickedMenu ? { display: 'none' } : { display: 'flex' }}>
					<nav>
						<Link>New Draft</Link>
						<Link>Previous drafts</Link>
						<Link>Settings</Link>
					</nav>
				</div>
				<img
					alt='menu button'
					src={menu}
					style={{ height: '30px' }}
					onClick={() => toggleClicked()}
				/>
			</div>
		</div>
	);
}

let mapStateToProps = (state) => state;

export default connect(mapStateToProps, { logout, getUser })(
	withRouter(Header)
);
