import { combineReducers } from 'redux';

import auth from './auth/reducer';
import user from './user/reducer';
import nav from './nav/reducer';

export default combineReducers({
	auth,
	user,
	nav,
});
