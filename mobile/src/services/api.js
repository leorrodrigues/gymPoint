import axios from 'axios';
import { LOCALHOST_IP } from 'react-native-dotenv';

const api = axios.create({
	baseURL: `http://${LOCALHOST_IP}:3333`,
});

export default api;
