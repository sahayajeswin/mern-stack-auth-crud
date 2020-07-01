const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;

// Create Schema
const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description:{
    type: String,
    required: false,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Customer = mongoose.model('Products', ProductSchema);
