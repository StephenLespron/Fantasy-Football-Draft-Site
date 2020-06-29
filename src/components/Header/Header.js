import React, { useEffect, useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../ducks/userReducer';
import menu from './hamburger.png';
import logo from './PngItem_5959932.png';
import './Header.css';

function Header(props) {
	let [clickedMenu, setClicked] = useState(false);

	useEffect(() => {
		// props.getUser();
		setClicked(false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.history.location.pathname]);

	let logout = () => {
		props.logout();
		props.history.push('/');
	};

	function toggleClicked() {
		setClicked(!clickedMenu);
	}

	return (
		<div>
			<div
				className='Header'
				style={!props.user.isLoggedIn ? { display: 'none' } : {}}>
				<div>
					<img
						alt='logo'
						src={logo}
						style={{
							height: '70px',
							transform: 'scaleX(-1)',
							marginLeft: '25px',
						}}
					/>
					<h3>Welcome, {props.user.username}</h3>
					<input type='button' value='Logout' onClick={() => logout()} />
				</div>
				<img
					id='hamburger'
					alt='menu button'
					src={menu}
					style={{ height: '30px' }}
					onClick={() => toggleClicked()}
				/>
			</div>
			<div
				className={!clickedMenu ? 'navMenu' : 'navMenuOpen navMenu'}
				style={!props.user.isLoggedIn ? { display: 'none' } : {}}>
				<nav>
					<Link to='/new-draft'>
						<li>New Draft</li>
					</Link>
					<Link to='/dashboard'>
						<li>Previous drafts</li>
					</Link>
					<Link to='/settings'>
						<li>Settings</li>
					</Link>
				</nav>
			</div>
		</div>
	);
}

let mapStateToProps = (state) => {
	return { user: state.user };
};

export default connect(mapStateToProps, { logout })(withRouter(Header));
