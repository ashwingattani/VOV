import * as UserTypes from '../types/UserTypes';
import {URLS} from '../api/urls';

export function saveUser(user) {
  return {
    type: UserTypes.SET_USER,
    payload: user,
  };
}

export function addNewUser(user) {
  return {
    type: UserTypes.ADD_NEW_USER,
    payload: {
      request: {
        url: URLS.ADD_USER,
        method: 'POST',
        data: user,
      },
    },
  };
}

export function getUser(mobileNumber) {
  return {
    type: UserTypes.GET_USER,
    payload: {
      request: {
        url: `${URLS.USER_TYPE}?mobileNumber=${mobileNumber}`,
        method: 'GET',
      },
    },
  };
}
