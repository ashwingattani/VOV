export const QUANTITIES = [
  {label: '1', value: 1},
  {label: '2', value: 2},
  {label: '3', value: 3},
  {label: '4', value: 4},
  {label: '5', value: 5},
  {label: '6', value: 6},
  {label: '7', value: 7},
  {label: '8', value: 8},
  {label: '9', value: 9},
  {label: '10', value: 10},
];

export const USER_TYPES = {Consumer: 'consumer', Seller: 'seller'};

export const CATEGORIES = {
  VEGGY: 'Vegetable',
  LEAFY_VEGGY: 'Leafy Vegetable',
  FRUITS: 'Fruit',
};

export const ORDER_STATUS = {
  OPEN: 'open',
  READY: 'ready',
  DELIVERED: 'delivered',
  FAILED: 'failed',
};

export const URLS = {
  baseURL: 'https://us-central1-com-atizriicon-vov.cloudfunctions.net',
  localbaseURL: 'http://localhost:5001/com-atizriicon-vov/us-central1',
  imageBaseURL:
    'https://firebasestorage.googleapis.com/v0/b/com-atizriicon-vov.appspot.com/o/',
};

export const REGEX = {
  email: /^[ \w-+.]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}[ ]*$/,
  name: /[a-zA-Z]+('[a-zA-Z])?[a-zA-Z]*/,
  houseNumber: /[A-Za-z0-9'.\-\s,]{1,10}/,
  address: /[A-Za-z0-9'.\-\s,]{5,30}/,
  phone: /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/,
  about: /[A-Za-z]{1,50}/,
  pincode: /^[1-9][0-9]{5}$/,
  search: /[A-Za-z0-9]/,
  number: /^[0-9]*$/,
};
