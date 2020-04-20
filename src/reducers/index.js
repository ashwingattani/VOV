import {combineReducers} from 'redux';
import order from './OrderReducer';
import user from './UserReducer';

export default combineReducers({
  user,
  order,
});
