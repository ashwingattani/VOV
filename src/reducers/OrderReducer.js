import * as OrderTypes from '../types/OrderTypes';
import * as UserTypes from '../types/UserTypes';

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
        isLoading: true,
      };
    case OrderTypes.GET_VEGETABLE_LIST_SUCCESS:
      return {
        isLoading: false,
        items: action.payload.data,
      };
    case OrderTypes.GET_VEGETABLE_LIST_FAIL:
      return {
        isLoading: false,
        error: action.error.response.request._response,
      };
    case OrderTypes.CREATE_ORDER:
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
        error: action.error.response.request._response,
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
        error: action.error.response.request._response,
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
        error: action.error.response.request._response,
        isLoading: false,
      };
    case OrderTypes.UPDATE_ORDER_ITEMS:
      return {
        isLoading: true,
      };
    case OrderTypes.UPDATE_ORDER_ITEMS_SUCCESS:
      return {
        isLoading: false,
      };
    case OrderTypes.UPDATE_ORDER_ITEMS_FAIL:
      return {
        error: action.error.response.request._response,
        isLoading: false,
      };
    case OrderTypes.UPDATE_ORDER_STATUS:
      return {
        isLoading: true,
      };
    case OrderTypes.UPDATE_ORDER_STATUS_SUCCESS:
      return {
        isLoading: false,
      };
    case OrderTypes.UPDATE_ORDER_STATUS_FAIL:
      return {
        error: action.error.response.request._response,
        isLoading: false,
      };
    case UserTypes.LOGOUT:
      return {
        items: [],
        order: undefined,
        openOrders: undefined,
        orderHistory: undefined,
        error: undefined,
        isLoading: false,
      };
    default:
      return state;
  }
};
