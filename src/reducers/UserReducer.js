import * as UserTypes from '../types/UserTypes';

let initalState = {
  user: {
    name: 'Test',
    mobileNumber: '1234567890',
    address: 'A2, ABC Complex, Road, City',
    pincode: 123456,
    type: 'Consumer',
  },
};

export default userReducer = (state = initalState, action) => {
  switch (action.type) {
    case UserTypes.SET_USER:
      state.user = action.payload;
      return {
        ...state,
      };
    case UserTypes.GET_USER:
      return {
        user: state.user,
      };
    default:
      return state;
  }
};
