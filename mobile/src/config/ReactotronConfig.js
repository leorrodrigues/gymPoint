import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import reactotronSaga from 'reactotron-redux-saga';
import AsyncStorage from '@react-native-community/async-storage';

if (__DEV__) {
	const tron = Reactotron.setAsyncStorageHandler(AsyncStorage)
		.configure({ host: '10.0.0.8' })
		.useReactNative()
		.use(reactotronRedux())
		.use(reactotronSaga())
		.connect();

	// eslint-disable-next-line no-console
	console.tron = tron;

	tron.clear();
}
