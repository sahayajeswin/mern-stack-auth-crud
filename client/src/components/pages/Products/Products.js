import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MUIDataTable from 'mui-datatables';
import Navebar from '../../partials/Navebar';
import ProductForm from './ProductForm';
import {
  getProducts,
  deleteProduct,
  updateEditData
} from '../../../redux/_actions/productAction';

const Products = () => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    if (proList.data.length == 0) {
      dispatch(getProducts());
    }
    console.log(products.itemList);
    setProList({
      data: [...products.itemList],
    });
  }, [products.itemList]);

  const [proList, setProList] = useState({
    data: [...products.itemList],
  });
  const [editData, setEditData] = useState({
    data: null,
  });

  const columns = [
    {
      label: 'Pro Name',
      name: 'name',
      options: {
        filter: true,
      },
    },
    {
      label: 'Price($)',
      name: 'price',
      options: {
        filter: true,
      },
    },
    {
      name: 'description',
      options: {
        filter: false,
      },
    },
    {
      name: 'date',
      options: {
        filter: true,
      },
    },
    {
      name: 'Edit',
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRenderLite: (dataIndex) => {
          return (
            <button
              className="btn btn-warning"
              onClick={handleEdit.bind(this, dataIndex)}
            >
              Edit
            </button>
          );
        },
      },
    },
    {
      name: 'Delete',
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRenderLite: (dataIndex) => {
          return (
            <button
              className="btn btn-danger"
              onClick={handleDelete.bind(this, dataIndex)}
            >
              Delete
            </button>
          );
        },
      },
    },
  ];

  const options = {
    filter: true,
    filterType: 'dropdown',
    responsive: 'vertical',
  };

  const handleEdit = (index) => {
    const { data } = proList;
    const editData = data.find((val, i) => i === index);
    console.log(data, editData);
    dispatch(updateEditData({ product: editData, type: true }));
  };

  const handleDelete = (index) => {
    const { data } = proList;
    const delData = data.find((val, i) => i === index);
    const proId = delData._id;
    dispatch(deleteProduct(proId));
  };

  return (
    <>
      <Navebar />
      <div className="container main-box">
        <div className="container-wrapper">
          <div className="row">
            <div className="col-md-8">
              <h5>Proudcts List</h5>
              <MUIDataTable
                title={'Employee List'}
                data={proList.data}
                columns={columns}
                options={options}
              />
            </div>
            <div className="col-md-4">
              <h5>Proudcts Form</h5>
              <ProductForm editData={editData} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Products;
