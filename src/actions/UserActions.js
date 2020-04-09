import * as UserTypes from '../types/UserTypes';

export function saveUser(user) {
  return {
    type: UserTypes.SET_USER,
    payload: user,
  };
}

export function getUser() {
  return {
    type: UserTypes.GET_USER,
  };
}
