const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

// Load User model
const Products = require('../models/Products');

// @route POST /api/products
// @desc Add New Product
// @access Public
router.post('/', async (req, res) => {
  try {
    const { name, price, description } = req.body;
    console.log(req.body);
    if (name && price) {
      const product = await Customer.findOne({ name });
      if (product) {
        return res.status(400).json({ message: 'Product already exists' });
      } else {
        const newProduct = new Products({
          name,
          price,
          description,
        });

        await newProduct
          .save()
          .then((response) => res.json(response))
          .catch((err) => res.status(400).json(error));
      }
    } else {
      return res
        .status(400)
        .json({ message: 'Please Enter Product Name and Price.' });
    }
  } catch (error) {
    return res.status(400).json(error);
  }
});

// @route POST /api/product
// @desc Add New Product
// @access Public
router.put('/', async (req, res) => {
  try {
    const { id, name, price, description } = req.body;

    const whereData = { _id: id };
    const updateData = {
      name,
      price,
      description,
    };

    const response = await Products.updateOne(whereData, updateData);
    res.json(response);
  } catch (error) {
    return res.status(400).json(error);
  }
});

// @route GET /api/product
// @desc Get All Products
// @access Public
router.get('/', async (req, res) => {
  try {
    const response = await Products.find({});
    res.json(response);
  } catch (error) {
    return res.status(400).json(error);
  }
});

// @route GET /api/product
// @desc Get Single Product By Id
// @access Public
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const response = await Products.findById({ _id: id });
    res.json(response);
  } catch (error) {
    return res.status(400).json(error);
  }
});

// @route Delete /api/product
// @desc Get Single Product By Id
// @access Public
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const response = await Products.findByIdAndDelete({ _id: id });
    res.json(response);
  } catch (error) {
    return res.status(400).json(error);
  }
});

module.exports = router;
