import * as types from './actionTypes';

export function saveTime(time) {
	return { type: types.SAVE_TIME, time };
}