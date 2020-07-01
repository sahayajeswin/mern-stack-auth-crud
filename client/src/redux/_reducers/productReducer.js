import {
  SAVE_PRO_SUCCESS,
  SAVE_PRO_FAIL,
  FETCH_PRO_SUCCESS,
  DELETE_PRO_SUCCESS,
  UPDATE_PRO_EDIT_DATA,
  CLEAR_PRO_EDIT_DATA,
} from '../types';
import { format } from 'date-fns';
const initState = {
  itemList: [],
  editData: null,
};

const getProductRows = (products) => {
  let proRows = products.map((val, key) => {
    return {
      _id: val._id,
      name: val.name,
      price: val.price,
      description: val.description,
      created: val.created,
      date: format(new Date(val.created), 'dd-MM-yyyy'),
    };
  });
  return proRows;
};

const removeProduct = (products, proId) => {
  return products.filter((val, i) => val._id != proId);
};

const productReducer = (state = initState, action) => {
  const { itemList } = state;
  switch (action.type) {
    case SAVE_PRO_SUCCESS:
      var productList = [action.payload, ...itemList];
      return {
        ...state,
        itemList: getProductRows(productList),
      };
    case SAVE_PRO_FAIL:
      var productList = [...itemList];
      return {
        ...state,
        itemList: getProductRows(productList),
      };
    case FETCH_PRO_SUCCESS:
      var productList = [...action.payload];
      return {
        ...state,
        itemList: getProductRows(productList),
      };
    case DELETE_PRO_SUCCESS:
      var newproductList = removeProduct(itemList, action.payload);
      return {
        ...state,
        itemList: newproductList,
      };
    case UPDATE_PRO_EDIT_DATA:
      return { ...state, editData: action.payload };
    case CLEAR_PRO_EDIT_DATA:
      return { ...state, editData: null };
    default:
      return state;
  }
};

export default productReducer;
