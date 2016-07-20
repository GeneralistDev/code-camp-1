import * as types from '../actions/actionTypes';

export default function timeReducer(state = [], action) {
	switch(action.type) {
		case types.SAVE_TIME:
			return [...state,
				Object.assign({}, action.time)
			];

		default:
			return state;
	}
}