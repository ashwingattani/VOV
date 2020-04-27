import * as UserTypes from '../types/UserTypes';

export default userReducer = (state = {}, action) => {
  switch (action.type) {
    case UserTypes.SET_USER:
      return {
        loggedinUser: action.payload,
      };
    case UserTypes.GET_USER:
      return {
        error: undefined,
        isLoading: true,
      };
    case UserTypes.GET_USER_SUCCESS:
      return {
        user: action.payload.data,
        isLoading: false,
        error: undefined,
      };
    case UserTypes.GET_USER_FAIL:
      return {
        error: action.error,
        isLoading: false,
      };
    case UserTypes.ADD_NEW_USER:
      return {
        isLoading: true,
      };
    case UserTypes.ADD_NEW_USER_SUCCESS:
      return {
        loggedinUser: action.payload.data,
        isLoading: false,
      };
    case UserTypes.ADD_NEW_USER_FAIL:
      return {
        error: action.error,
        isLoading: false,
      };
    case UserTypes.LOGOUT:
      return {
        loggedinUser: {},
        user: {},
        error: undefined,
        isLoading: false,
        logoutSuccessfull: true,
      };
    default:
      return state;
  }
};
