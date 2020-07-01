import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MDBDataTableV5, MDBBtn } from 'mdbreact';
import Navebar from '../../partials/Navebar';
import ProductForm from './ProductForm';
import { getProducts } from '../../../redux/_actions/productAction';

const Products = () => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const [datatable, setDatatable] = useState({
    columns: [
      {
        label: 'Name',
        field: 'name',
        width: 150,
        sort: 'asc',
        attributes: {
          'aria-controls': 'DataTable',
          'aria-label': 'Name',
        },
      },
      {
        label: 'Price',
        field: 'price',
        sort: 'asc',
        width: 50,
      },
      {
        label: 'Description',
        field: 'description',
        width: 100,
      },
      {
        label: 'Date',
        field: 'created',
        width: 100,
      },
      {
        label: 'Delete',
        field: 'delete',
        width: 100,
      },
    ],
    rows: [...products.itemList],
  });

  useEffect(() => {
    if (datatable.rows.length == 0) {
      dispatch(getProducts());
    }
    setDatatable({
      columns: datatable.columns,
      rows: [...products.itemList],
    });
  }, [products.itemList]);

  return (
    <>
      <Navebar />
      <div className="container main-box">
        <div className="container-wrapper">
          <div className="row">
            <div className="col-md-8">
              <h5>Proudcts List</h5>
              <MDBDataTableV5
                hover
                entriesOptions={[5, 20, 25]}
                entries={5}
                pagesAmount={4}
                data={datatable}
                searchTop
                searchBottom={false}
              />
            </div>
            <div className="col-md-4">
              <h5>Proudcts Form</h5>
              <ProductForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Products;
