import * as ConsumerTypes from '../types/ConsumerTypes';

export function getVegetableList() {
  return {
    type: ConsumerTypes.GET_VEGETABLE_LIST,
  };
}

export function createOrder(items) {
  let orderDetails = {
    date: Date(),
    items: items,
  };
  return {
    type: ConsumerTypes.CREATE_ORDER,
    payload: orderDetails,
  };
}

export function getOrderDetails() {
  return {
    type: ConsumerTypes.GET_ORDER_DETAILS,
  };
}

export function getOrderHistory() {
  return {
    type: ConsumerTypes.GET_ORDER_HISTORY,
  };
}
