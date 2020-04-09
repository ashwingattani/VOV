import {combineReducers} from 'redux';
import consumer from './ConsumerReducer';
import user from './UserReducer';
import seller from './SellerReducer';

export default combineReducers({
  user,
  consumer,
  seller,
});
