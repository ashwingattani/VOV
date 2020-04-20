import * as OrderTypes from '../types/OrderTypes';

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

export default orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case OrderTypes.GET_VEGETABLE_LIST:
      return {
        ...state,
        isLoading: true,
      };
    case OrderTypes.GET_VEGETABLE_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        items: action.payload.data,
      };
    case OrderTypes.GET_VEGETABLE_LIST_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case OrderTypes.CREATE_ORDER:
      state.orderDetails = action.payload;
      return {
        isLoading: true,
      };
    case OrderTypes.CREATE_ORDER_SUCCESS:
      return {
        order: action.payload.data,
        isLoading: false,
      };
    case OrderTypes.CREATE_ORDER_FAIL:
      return {
        error: action.error,
        isLoading: false,
      };
    case OrderTypes.OPEN_ORDERS:
      return {
        isLoading: true,
      };
    case OrderTypes.OPEN_ORDERS_SUCCESS:
      return {
        openOrders: action.payload.data,
        isLoading: false,
      };
    case OrderTypes.OPEN_ORDERS_FAIL:
      return {
        error: action.error,
        isLoading: false,
      };
    case OrderTypes.GET_ORDER_HISTORY:
      return {
        isLoading: true,
      };
    case OrderTypes.GET_ORDER_HISTORY_SUCCESS:
      return {
        orderHistory: action.payload.data,
        isLoading: false,
      };
    case OrderTypes.GET_ORDER_HISTORY_FAIL:
      return {
        error: action.error,
        isLoading: false,
      };
    default:
      return state;
  }
};