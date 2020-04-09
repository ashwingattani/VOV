import {combineReducers} from 'redux';
import consumer from './ConsumerReducer';
import user from './UserReducer';

export default combineReducers({
  consumer,
  user,
});
