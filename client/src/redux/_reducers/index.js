import { combineReducers } from 'redux';
import authReducer from './authReducer';
import alertReducer from './alertReducer';
import productReducer from './productReducer';

export default combineReducers({
  auth: authReducer,
  alert: alertReducer,
  products: productReducer,
});
