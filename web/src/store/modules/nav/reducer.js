import produce from 'immer';

const INITIAL_STATE = {
	navItem: 'STUDENTS',
};

export default function use(state = INITIAL_STATE, action) {
	return produce(state, draft => {
		switch (action.type) {
			case '@nav/UPDATE_ACTIVE_NAVIGATION_REQUEST': {
				draft.navItem = action.payload.navItem;
				break;
			}
			default:
		}
	});
}
