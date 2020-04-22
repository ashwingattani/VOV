import {createStore, applyMiddleware} from 'redux';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';

import reducer from '../reducers';

const client = axios.create({
  baseURL: 'http://localhost:5001/com-atizriicon-vov/us-central1',
  responseType: 'json',
});

export default store = createStore(
  reducer,
  applyMiddleware(axiosMiddleware(client)),
);
