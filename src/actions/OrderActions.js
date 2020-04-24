import * as OrderTypes from '../types/OrderTypes';
import {URLS} from '../api/urls';

export function getVegetableList() {
  return {
    type: OrderTypes.GET_VEGETABLE_LIST,
    payload: {
      request: {
        url: URLS.ITEMS_LIST,
        method: 'GET',
      },
    },
  };
}

export function createOrder(items, user) {
  let orderDetails = {
    items: items,
    customer: user,
  };
  return {
    type: OrderTypes.CREATE_ORDER,
    payload: {
      request: {
        url: URLS.ADD_ORDER,
        method: 'POST',
        data: orderDetails,
      },
    },
  };
}

export function getOpenOrders(user) {
  return {
    type: OrderTypes.OPEN_ORDERS,
    payload: {
      request: {
        url: `${URLS.CURRENT_ORDERS}?userId=${user.id}&userType=${user.type}`,
        method: 'GET',
      },
    },
  };
}

export function getOrderHistory(user) {
  return {
    type: OrderTypes.GET_ORDER_HISTORY,
    payload: {
      request: {
        url: `${URLS.PREVIOUS_ORDERS}?userId=${user.id}&userType=${user.type}`,
        method: 'GET',
      },
    },
  };
}

export function updateOrderStatus(order) {
  return {
    type: OrderTypes.UPDATE_ORDER_STATUS,
    payload: {
      request: {
        url: URLS.UPDATE_ORDER_STATUS,
        method: 'POST',
        data: order,
      },
    },
  };
}

export function updateItemsForOrder(id, items) {
  return {
    type: OrderTypes.UPDATE_ORDER_ITEMS,
    payload: {
      request: {
        url: URLS.UPDATE_ORDER_ITEMS,
        method: 'POST',
        data: {id, items},
      },
    },
  };
}
