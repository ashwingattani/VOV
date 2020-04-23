import {createStore, applyMiddleware} from 'redux';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import {BASE_URLS} from '../constants/Enums';

import reducer from '../reducers';

const client = axios.create({
  baseURL: BASE_URLS.baseURL,
  // baseURL: BASE_URLS.localbaseURL,
  responseType: 'json',
});

export default store = createStore(
  reducer,
  applyMiddleware(axiosMiddleware(client)),
);
