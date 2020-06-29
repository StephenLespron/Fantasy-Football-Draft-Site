const initialState = {
	availPlayers: [],
	teams: [],
	draftedPlayers: [],
};

const START_DRAFT = 'START_DRAFT';
const GET_PLAYERS = 'GET_PLAYERS';
const LOAD_DRAFT = 'LOAD_DRAFT';
const DRAFT_PLAYER = 'DRAFT_PLAYER';
const UNDRAFT_PLAYER = 'UNDRAFT_PLAYER';

export function startDraft(teams) {
	return {
		type: START_DRAFT,
		payload: teams,
	};
}
export function loadDraft(teams, drafted) {
	return {
		type: LOAD_DRAFT,
		payload: { teams, drafted },
	};
}

export function draftPlayer(drafted, avail) {
	return {
		type: DRAFT_PLAYER,
		payload: { drafted, avail },
	};
}

export function undraftPlayer(drafted, avail) {
	return {
		type: UNDRAFT_PLAYER,
		payload: { drafted, avail },
	};
}

export function getPlayers(drafted, avail) {
	return {
		type: GET_PLAYERS,
		payload: { avail, drafted },
	};
}

export default function (state = initialState, action) {
	switch (action.type) {
		case START_DRAFT:
			return {
				...initialState,
				teams: action.payload,
			};
		case GET_PLAYERS:
			return {
				...state,
				availPlayers: action.payload.avail,
				draftedPlayers: action.payload.drafted,
			};
		case LOAD_DRAFT:
			return {
				...initialState,
				teams: action.payload.teams,
				draftedPlayers: action.payload.drafted,
			};
		case DRAFT_PLAYER:
			return {
				...state,
				availPlayers: action.payload.avail,
				draftedPlayers: [action.payload.drafted, ...state.draftedPlayers],
			};
		case UNDRAFT_PLAYER:
			return {
				...state,
				availPlayers: [action.payload.avail, ...state.availPlayers],
				draftedPlayers: [...action.payload.drafted],
			};
		default:
			return state;
	}
}
