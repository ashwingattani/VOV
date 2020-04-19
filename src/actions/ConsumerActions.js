import * as ConsumerTypes from '../types/ConsumerTypes';
import {URLS} from '../api/urls';

export function getVegetableList() {
  return {
    type: ConsumerTypes.GET_VEGETABLE_LIST,
    payload: {
      request: {
        url: URLS.ITEMS_LIST,
        method: 'GET',
      },
    },
  };
}

export function createOrder(items, userId) {
  let orderDetails = {
    items: items,
    customerId: userId,
  };
  return {
    type: ConsumerTypes.CREATE_ORDER,
    payload: {
      request: {
        url: URLS.ADD_ORDER,
        method: 'POST',
        data: orderDetails,
      },
    },
  };
}

export function getOrderDetails(type, userId) {
  return {
    type: ConsumerTypes.GET_ORDER_DETAILS,
    payload: {
      request: {
        url: URLS.CURRENT_ORDERS,
        method: 'GET',
        data: {
          userId: userId,
          userType: type,
        },
      },
    },
  };
}

export function getOrderHistory(type, userId) {
  return {
    type: ConsumerTypes.GET_ORDER_HISTORY,
    payload: {
      request: {
        url: URLS.PREVIOUS_ORDERS,
        method: 'GET',
        data: {
          userId: userId,
          userType: type,
        },
      },
    },
  };
}
