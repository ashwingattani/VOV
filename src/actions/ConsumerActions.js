import * as ConsumerTypes from '../types/ConsumerTypes';

export function getVegetableList() {
  return {
    type: ConsumerTypes.GET_VEGETABLE_LIST,
  };
}

export function createOrder(payload) {
  return {
    type: ConsumerTypes.CREATE_ORDER,
    payload,
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
