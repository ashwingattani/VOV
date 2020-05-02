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
        ...state,
        isLoading: true,
      };
    case OrderTypes.GET_VEGETABLE_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        items: action.payload.data,
        error: undefined,
      };
    case OrderTypes.GET_VEGETABLE_LIST_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.error.response.request._response,
      };
    case OrderTypes.CREATE_ORDER:
      return {
        ...state,
        isLoading: true,
      };
    case OrderTypes.CREATE_ORDER_SUCCESS:
      return {
        ...state,
        order: action.payload.data,
        isLoading: false,
        error: undefined,
      };
    case OrderTypes.CREATE_ORDER_FAIL:
      return {
        ...state,
        error: action.error.response.request._response,
        isLoading: false,
      };
    case OrderTypes.OPEN_ORDERS:
      return {
        ...state,
        isLoading: true,
      };
    case OrderTypes.OPEN_ORDERS_SUCCESS:
      return {
        ...state,
        openOrders: action.payload.data,
        isLoading: false,
        error: undefined,
      };
    case OrderTypes.OPEN_ORDERS_FAIL:
      return {
        ...state,
        error: action.error.response.request._response,
        isLoading: false,
      };
    case OrderTypes.GET_ORDER_HISTORY:
      return {
        ...state,
        isLoading: true,
      };
    case OrderTypes.GET_ORDER_HISTORY_SUCCESS:
      return {
        ...state,
        orderHistory: action.payload.data,
        isLoading: false,
        error: undefined,
      };
    case OrderTypes.GET_ORDER_HISTORY_FAIL:
      return {
        ...state,
        error: action.error.response.request._response,
        isLoading: false,
      };
    case OrderTypes.UPDATE_ORDER_ITEMS:
      return {
        ...state,
        isLoading: true,
      };
    case OrderTypes.UPDATE_ORDER_ITEMS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: undefined,
      };
    case OrderTypes.UPDATE_ORDER_ITEMS_FAIL:
      return {
        ...state,
        error: action.error.response.request._response,
        isLoading: false,
      };
    case OrderTypes.UPDATE_ORDER_STATUS:
      return {
        ...state,
        isLoading: true,
      };
    case OrderTypes.UPDATE_ORDER_STATUS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: undefined,
      };
    case OrderTypes.UPDATE_ORDER_STATUS_FAIL:
      return {
        ...state,
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
