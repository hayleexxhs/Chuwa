const mongoose = require("mongoose");

const productScheme = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  quantityInStock: {
    type: String,
    required: true,
  },
  imgSrc: {
    type: String,
    required: true,
  },
});

module.exports = productScheme;
