const initialState = {
	newDraftId: null,
	drafts: [],
	availPlayers: [],
	teams: [],
	order: [],
	draftedPlayers: [],
};

const GET_DRAFTS = 'GET_DRAFTS';
const GET_TEAMS = 'GET_TEAMS';
const GET_PLAYERS = 'GET_PLAYERS';
const DRAFT_PLAYER = 'DRAFT_PLAYER';

export function getDrafts(drafts) {
	return {
		type: GET_DRAFTS,
		payload: drafts,
	};
}

export function getTeams(draft, teams) {
	return {
		type: GET_TEAMS,
		payload: { draft, teams },
	};
}

export function draftPlayer(drafted, avail, order) {
	return {
		type: DRAFT_PLAYER,
		payload: { drafted, avail, order },
	};
}

export function getPlayers(players) {
	return {
		type: GET_PLAYERS,
		payload: players,
	};
}

export default function (state = initialState, action) {
	switch (action.type) {
		case GET_DRAFTS:
			return {
				...state,
			};
		case GET_TEAMS:
			return {
				...state,
				teams: action.payload.teams,
				newDraftId: action.payload.draft,
			};
		case GET_PLAYERS:
			return {
				...state,
				availPlayers: action.payload,
			};
		case DRAFT_PLAYER:
			return {
				...state,
				availPlayers: action.payload.avail,
				draftedPlayers: [...state.draftedPlayers, action.payload.drafted],
				order: action.payload.order,
			};
		default:
			return state;
	}
}
