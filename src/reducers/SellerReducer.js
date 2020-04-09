import * as SellerTypes from '../types/SellerTypes';

let initialState = {
  currentOrders: [
    {
      date: new Date(),
      items: [
        {
          id: 6,
          name: 'Lady Finger',
          selectedValue: '1',
        },
      ],
      houseName: 'ABC',
      houseNumber: 'A-1',
    },
    {
      date: new Date(),
      items: [
        {
          id: 4,
          name: 'Potato',
          selectedValue: '3',
        },
      ],
      houseName: 'ABC',
      houseNumber: 'A-2',
    },
    {
      date: new Date(),
      items: [
        {
          id: 4,
          name: 'Potato',
          selectedValue: '3',
        },
      ],
      houseName: 'PQR',
      houseNumber: 'C-4',
    },
  ],
  previousOrders: [
    {
      date: new Date(),
      items: [
        {
          id: 6,
          name: 'Lady Finger',
          selectedValue: '1',
        },
      ],
      houseName: 'ABC',
      houseNumber: 'A-1',
    },
    {
      date: new Date(),
      items: [
        {
          id: 4,
          name: 'Potato',
          selectedValue: '3',
        },
      ],
      houseName: 'ABC',
      houseNumber: 'A-2',
    },
    {
      date: new Date(),
      items: [
        {
          id: 4,
          name: 'Potato',
          selectedValue: '3',
        },
      ],
      houseName: 'PQR',
      houseNumber: 'C-4',
    },
  ],
};

export default sellerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SellerTypes.GET_CURRENT_ORDERS:
      return {
        currentOrders: state.currentOrders,
      };
    case SellerTypes.GET_PREVIOUS_ORDERS:
      return {
        previousOrders: state.previousOrders,
      };
    default:
      return state;
  }
};
