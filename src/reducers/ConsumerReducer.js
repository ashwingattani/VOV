import * as ConsumerTypes from '../types/ConsumerTypes';

const initialState = {
  orderDetails: {
    date: new Date(),
    items: [
      {
        id: 6,
        name: 'Lady Finger',
        selectedValue: '1',
      },
    ],
  },
};

export default consumerReducer = (state = initialState, action) => {
  switch (action.type) {
    case ConsumerTypes.GET_VEGETABLE_LIST:
      return {
        ...state,
        isLoading: true,
      };
    case ConsumerTypes.GET_VEGETABLE_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        items: action.payload.data,
      };
    case ConsumerTypes.GET_VEGETABLE_LIST_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case ConsumerTypes.CREATE_ORDER:
      state.orderDetails = action.payload;
      return {
        ...state,
      };
    case ConsumerTypes.GET_ORDER_DETAILS:
      return {
        ...state,
        orderDetails: state.orderDetails,
      };
    case ConsumerTypes.GET_ORDER_HISTORY:
      return {
        ...state,
        orderHistory: [state.orderDetails],
      };
    default:
      return state;
  }
};
