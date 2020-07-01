import React from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ProtectedRoute({ exact = false, path, component, roles }) {
	const { isLoggedIn } = useSelector((state) => {
		console.log(state.user);
		return state.user;
	});

	const location = useLocation();

	return (
		<>
			isLoggedIn ? {<Route exact={exact} path={path} component={component} />} :
			{
				<Redirect
					to={{
						pathname: location?.state?.from ? location?.state?.from : '/',
						state: { from: location.pathname },
					}}
				/>
			}
		</>
	);
}

export default ProtectedRoute;
