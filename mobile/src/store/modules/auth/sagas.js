import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '~/services/api';

import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
	try {
		const { id } = payload;

		const response = yield call(api.post, '/sessions/student', {
			id,
		});

		console.tron.log(response.data);

		const { token, student } = response.data;

		api.defaults.headers.Authorization = `Baerer ${token}`;

		yield put(signInSuccess(token, student));
	} catch (err) {
		Alert.alert('Authentication error', 'Invalid student ID');
		yield put(signFailure());
	}
}

export function setToken({ payload }) {
	if (!payload) return;

	const { token } = payload.auth;

	if (token) {
		api.defaults.headers.Authorization = `Baerer ${token}`;
	}
}

export default all([
	takeLatest('persist/REHYDRATE', setToken),
	takeLatest('@auth/SIGN_IN_REQUEST', signIn),
]);
