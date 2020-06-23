import { combineReducers } from 'redux';
import user from './userReducer';
import draft from './draftReducer';

export default combineReducers({
	user,
	draft,
});
