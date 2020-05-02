import * as UserTypes from '../types/UserTypes';

export default userReducer = (state = {}, action) => {
  switch (action.type) {
    case UserTypes.SET_USER:
      return {
        loggedinUser: action.payload,
      };
    case UserTypes.GET_USER:
      return {
        ...state,
        error: undefined,
        isLoading: true,
      };
    case UserTypes.GET_USER_SUCCESS:
      return {
        ...state,
        user: action.payload.data,
        isLoading: false,
        error: undefined,
      };
    case UserTypes.GET_USER_FAIL:
      return {
        ...state,
        error: action.error.response.request._response,
        isLoading: false,
      };
    case UserTypes.ADD_NEW_USER:
      return {
        ...state,
        isLoading: true,
      };
    case UserTypes.ADD_NEW_USER_SUCCESS:
      return {
        ...state,
        loggedinUser: action.payload.data,
        isLoading: false,
        error: undefined,
      };
    case UserTypes.ADD_NEW_USER_FAIL:
      return {
        ...state,
        error: action.error.response.request._response,
        isLoading: false,
      };
    case UserTypes.LOGOUT:
      return {
        loggedinUser: undefined,
        user: undefined,
        error: undefined,
        isLoading: false,
        logoutSuccessfull: true,
      };
    default:
      return state;
  }
};
