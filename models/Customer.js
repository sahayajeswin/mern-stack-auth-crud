const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;

// Create Schema
const CustomerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Customer = mongoose.model('Customer', CustomerSchema);
