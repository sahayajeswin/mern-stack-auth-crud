import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  SET_ALERT,
} from '../types';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { setAlert } from './alertAction';

export const register = (user) => {
  return async (dispatch) => {
    const config = { header: { 'Content-Type': 'application/json' } };
    try {
      const res = await axios.post('/api/users/register', user, config);
      console.log(res);
      dispatch({ type: REGISTER_SUCCESS, payload: res.data });
    } catch (err) {
      // console.log(err, err.response.data.message);
      dispatch(setAlert(err.response.data.message, 'danger'));
      // dispatch({ type: REGISTER_FAIL, payload: err.response.data.message });
    }
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    try {
      const config = { header: { 'Content-Type': 'application/json' } };
      const res = await axios
        .post(`/api/users/login`, { email, password }, config)
        .then((res) => {
          const { token } = res.data;
          const decoded = jwt_decode(token);
          localStorage.setItem('token', token);
          return res;
        });
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    } catch (err) {
      console.log(err);
      dispatch(setAlert(err.response.data.message, 'danger'));
      // dispatch({ type: LOGIN_FAIL, payload: err.response.data.message });
    }
  };
};
