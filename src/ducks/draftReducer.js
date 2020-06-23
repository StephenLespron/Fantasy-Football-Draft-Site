const initialState = {
	newDraftId: null,
	drafts: [],
	teams: [],
	players: [],
};

const GET_DRAFTS = 'GET_DRAFTS';
const GET_TEAMS = 'GET_TEAMS';

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
		default:
			return initialState;
	}
}
