import axios from 'axios';

const initialState = {
	userId: null,
	username: '',
	email: '',
	isLoggedIn: false,
};

const LOGIN_USER = 'LOGIN_USER',
	LOGOUT_USER = 'LOGOUT_USER',
	GET_USER = 'GET_USER';

export function login(user) {
	return {
		type: LOGIN_USER,
		payload: user,
	};
}

export function logout() {
	axios
		.post('auth/logout')
		.then(() => {})
		.catch((err) => alert(err.response.data));
	return {
		type: LOGOUT_USER,
		payload: initialState,
	};
}

export function getUser() {
	const user = axios
		.get(`auth/getUser`)
		.catch(() => console.log('No users logged in'));

	return { type: GET_USER, payload: user.data };
}

export default function (state = initialState, action) {
	switch (action.type) {
		case LOGIN_USER:
			return { ...state, ...action.payload, isLoggedIn: true };
		case LOGOUT_USER:
			return { ...state, ...action.payload };
		case GET_USER + '_PENDING':
			return state;
		case GET_USER + '_FULFILLED':
			return { ...state, ...action.payload, isLoggedIn: true };
		case GET_USER + '_REJECTED':
			return initialState;
		default:
			return initialState;
	}
}
