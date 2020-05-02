import {createStore, applyMiddleware} from 'redux';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import {URLS} from '../constants/Enums';

import reducer from '../reducers';

const client = axios.create({
  baseURL: URLS.baseURL,
  // baseURL: URLS.localbaseURL,
  responseType: 'json',
});

const options = {
  // not required, but use-full configuration option
  returnRejectedPromiseOnError: true,
  interceptors: {
    request: [
      ({getState, dispatch}, config) => {
        // Request interception
        return config;
      },
    ],
    response: [
      {
        success: ({dispatch}, response) => {
          // Response interception
          if (response.status == 204) {
            response.request._response = 'No Content Found!';
            let error = {response: response};
            return Promise.reject(error);
          }
          return response;
        },
        error: ({dispatch}, error) => {
          // Response Error Interception
          return Promise.reject(error);
        },
      },
    ],
  },
};

export default store = createStore(
  reducer,
  applyMiddleware(axiosMiddleware(client, options)),
);
