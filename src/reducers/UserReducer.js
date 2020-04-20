import * as UserTypes from '../types/UserTypes';

let initalState = {
  user: {
    name: 'Test',
    mobileNumber: '1234567890',
    address: 'A2, ABC Complex, Road, City',
    pincode: 123456,
    type: 'consumer',
  },
};

export default userReducer = (state = initalState, action) => {
  switch (action.type) {
    case UserTypes.SET_USER:
      return {
        loggedinUser: action.payload,
      };
    case UserTypes.GET_USER:
      return {
        isLoading: true,
      };
    case UserTypes.GET_USER_SUCCESS:
      return {
        user: action.payload.data,
        isLoading: false,
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
    default:
      return state;
  }
};
