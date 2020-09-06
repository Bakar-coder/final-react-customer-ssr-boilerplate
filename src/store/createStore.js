import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import axios from 'axios';

export default req => {
	const initialState = {};
	const token = req.get('cookie') || null;
	const axiosInstance = axios.create({
		baseURL: 'http://localhost:5000',
		headers: { 'x-auth-token': token }
	});
	return createStore(
		reducers,
		initialState,
		applyMiddleware(thunk.withExtraArgument(axiosInstance))
	);
};
