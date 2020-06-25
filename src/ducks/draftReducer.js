import axios from 'axios';

const initialState = {
	newDraftId: null,
	drafts: [],
	availPlayers: [],
	teams: [],
	draftedPlayers: [],
};

const GET_DRAFTS = 'GET_DRAFTS';
const START_DRAFT = 'START_DRAFT';
const GET_PLAYERS = 'GET_PLAYERS';
const DRAFT_PLAYER = 'DRAFT_PLAYER';
const UNDRAFT_PLAYER = 'UNDRAFT_PLAYER';

export function getDrafts(drafts) {
	return {
		type: GET_DRAFTS,
		payload: drafts,
	};
}

export function startDraft(draft, teams) {
	return {
		type: START_DRAFT,
		payload: { draft, teams },
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
		case START_DRAFT:
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
