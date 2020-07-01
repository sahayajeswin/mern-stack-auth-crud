import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setAlert } from '../../../redux/_actions/alertAction';
import {
  saveProduct,
  updateProduct,
} from '../../../redux/_actions/productAction';

const ProductForm = ({ ...props }) => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const [newProduct, setNewProduct] = useState({
    id: null,
    name: '',
    price: '',
    description: '',
    editStatus: false,
  });

  if (
    products.editData &&
    (!newProduct.editStatus || products.editData._id != newProduct.id)
  ) {
    const { _id, name, price, description } = products.editData;
    setNewProduct({ id: _id, name, price, description, editStatus: true });
    return false;
  }

  const { name, price, description } = newProduct;

  const onChange = (e) =>
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (name === '' || price === '') {
      dispatch(
        setAlert('Please enter Product Name and Price the fields.', 'danger')
      );
    } else if (newProduct.id) {
      dispatch(updateProduct(newProduct));
      setNewProduct({
        id: null,
        name: '',
        price: '',
        description: '',
        editStatus: false,
      });
    } else {
      dispatch(saveProduct(newProduct));
      setNewProduct({
        id: null,
        name: '',
        price: '',
        description: '',
        editStatus: false,
      });
    }
  };

  return (
    <form noValidate onSubmit={onSubmit}>
      <div className="form-group">
        <label>Product Name</label>
        <input
          className="form-control"
          placeholder="Name"
          onChange={onChange}
          value={name}
          name="name"
          type="text"
          autoComplete="off"
        />
      </div>

      <div className="form-group">
        <label>Price ($)</label>
        <input
          className="form-control"
          onChange={onChange}
          value={price}
          name="price"
          type="text"
          placeholder="Enter Product Price"
          autoComplete="off"
        />
      </div>

      <div className="form-group">
        <label>Product Description</label>
        <textarea
          className="form-control"
          onChange={onChange}
          value={description}
          name="description"
          placeholder="Enter Prdouct Description (Optional)"
          autoComplete="off"
        />
      </div>

      <button type="submit" className="btn btn-primary btn-block">
        Save
      </button>
    </form>
  );
};

export default ProductForm;
