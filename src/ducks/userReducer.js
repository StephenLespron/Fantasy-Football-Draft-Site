import axios from 'axios';

const initialState = {
	userId: null,
	username: '',
	email: '',
	isLoggedIn: null,
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
	return { type: GET_USER, payload: null };
}

export default function (state = initialState, action) {
	switch (action.type) {
		case LOGIN_USER:
			return { ...state, ...action.payload, isLoggedIn: true };
		case LOGOUT_USER:
			return { ...state, ...action.payload, isLoggedIn: false };
		case GET_USER:
			return { ...state, isLoggedIn: false };
		default:
			return state;
	}
}
