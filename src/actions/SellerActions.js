import * as SellerTypes from '../types/SellerTypes';

export function getCurrentOrders() {
  return {
    type: SellerTypes.GET_CURRENT_ORDERS,
  };
}

export function getPreviousOrders() {
  return {
    type: SellerTypes.GET_PREVIOUS_ORDERS,
  };
}
