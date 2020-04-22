import {createStore, applyMiddleware} from 'redux';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';

import reducer from '../reducers';

const client = axios.create({
  baseURL: 'https://us-central1-com-atizriicon-vov.cloudfunctions.net',
  responseType: 'json',
});

export default store = createStore(
  reducer,
  applyMiddleware(axiosMiddleware(client)),
);
