const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  //npm uuid
  id: {
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
  userType: {
    type: String,
    required: true,
  },
  cart: {
    type: [],
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  totPrice: {
    type: Number,
    required: true,
  },
});

module.exports = userSchema;
