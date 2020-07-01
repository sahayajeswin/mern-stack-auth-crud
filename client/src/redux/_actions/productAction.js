import {
  SAVE_PRO_SUCCESS,
  SAVE_PRO_PROCESS,
  SAVE_PRO_FAIL,
  UPDATE_PRO_SUCCESS,
  FETCH_PRO_SUCCESS,
  DELETE_PRO_SUCCESS,
  UPDATE_PRO_EDIT_DATA,
  CLEAR_PRO_EDIT_DATA,
} from '../types';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { setAlert } from './alertAction';

export const saveProduct = (product) => {
  return async (dispatch) => {
    const config = { header: { 'Content-Type': 'application/json' } };
    try {
      const res = await axios.post('/api/product', product, config);
      console.log(res);
      dispatch({ type: SAVE_PRO_SUCCESS, payload: res.data });
    } catch (err) {
      dispatch(setAlert(err.response.data.message, 'danger'));
      // dispatch({ type: REGISTER_FAIL, payload: err.response.data.message });
    }
  };
};

export const updateEditData = (data) => {
  return async (dispatch) => {
    try {
      if (data.type)
        dispatch({ type: UPDATE_PRO_EDIT_DATA, payload: data.product });
      else dispatch({ type: CLEAR_PRO_EDIT_DATA, payload: null });
    } catch (err) {
      console.log(err, err.response.data.message);
      dispatch(setAlert(err.response.data.message, 'danger'));
      // dispatch({ type: REGISTER_FAIL, payload: err.response.data.message });
    }
  };
};

export const updateProduct = (product) => {
  return async (dispatch) => {
    const config = { header: { 'Content-Type': 'application/json' } };
    try {
      const res = await axios.put('/api/product', product, config);
      console.log(res);
      getProducts();
      // dispatch({ type: UPDATE_PRO_SUCCESS, payload: res.data });
    } catch (err) {
      console.log(err, err.response.data.message);
      dispatch(setAlert(err.response.data.message, 'danger'));
      // dispatch({ type: REGISTER_FAIL, payload: err.response.data.message });
    }
  };
};

export const deleteProduct = (proId) => {
  return async (dispatch) => {
    const config = { header: { 'Content-Type': 'application/json' } };
    try {
      const res = await axios.delete(`/api/product/${proId}`, config);
      if (res.data) {
        dispatch({ type: DELETE_PRO_SUCCESS, payload: proId });
      }
    } catch (err) {
      console.log(err, err.response.data.message);
      dispatch(setAlert(err.response.data.message, 'danger'));
    }
  };
};

export const getProducts = () => {
  return async (dispatch) => {
    const config = { header: { 'Content-Type': 'application/json' } };
    try {
      const res = await axios.get('/api/product', config);
      console.log(res);
      dispatch({ type: FETCH_PRO_SUCCESS, payload: res.data });
    } catch (err) {
      console.log(err, err.response.data.message);
      dispatch(setAlert(err.response.data.message, 'danger'));
      // dispatch({ type: REGISTER_FAIL, payload: err.response.data.message });
    }
  };
};
