import React from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ProtectedRoute({ exact = false, path, component }) {
	const { isLoggedIn } = useSelector((state) => {
		return state.user;
	});

	const location = useLocation();

	return (
		<>
			{isLoggedIn ? (
				<Route exact={exact} path={path} component={component} />
			) : (
				<Redirect
					to={{
						pathname: location?.state?.from ? location?.state?.from : '/',
						state: { from: location.pathname },
					}}
				/>
			)}
		</>
	);
}

export default ProtectedRoute;
