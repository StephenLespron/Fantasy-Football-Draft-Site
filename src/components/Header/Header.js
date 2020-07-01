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

	let addPrevRoute = (newLoc) => (prevLoc) => {
		return {
			pathname: newLoc,
			state: {
				from: prevLoc.pathname,
			},
		};
	};

	let display =
		!props.user.isLoggedIn ||
		props.location.pathname.includes('/teams') ||
		props.location.pathname.includes('/board')
			? false
			: true;

	return (
		<div>
			{console.log(display)}
			<div className='Header' style={!display ? { display: 'none' } : {}}>
				<div>
					<img
						alt='logo'
						src={logo}
						style={{
							height: '7vh',
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
					onClick={() => toggleClicked()}
				/>
			</div>
			<div
				className={!clickedMenu ? 'navMenu' : 'navMenuOpen navMenu'}
				style={!display ? { display: 'none' } : {}}>
				<nav>
					<Link to={addPrevRoute('/new-draft')}>
						<li>New Draft</li>
					</Link>
					<Link to={addPrevRoute('/dashboard')}>
						<li>Previous drafts</li>
					</Link>
					<Link to={addPrevRoute('/settings')}>
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
