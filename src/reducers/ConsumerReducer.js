import * as ConsumerTypes from '../types/ConsumerTypes';

const initialState = {
  items: [
    {
      id: 0,
      name: 'Onion',
    },
    {
      id: 1,
      name: 'Potato',
    },
    {
      id: 2,
      name: 'Cauliflower',
    },
    {
      id: 3,
      name: 'Sweet Potato',
    },
    {
      id: 4,
      name: 'Coriander',
    },
    {
      id: 5,
      name: 'Spinach',
    },
    {
      id: 6,
      name: 'Lady Finger',
    },
  ],
  orderDetails: {
    date: Date(),
    id: 6,
    name: 'Lady Finger',
  },
};

export default consumerReducer = (state = initialState, action) => {
  switch (action.type) {
    case ConsumerTypes.GET_VEGETABLE_LIST:
      return {
        ...state,
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
