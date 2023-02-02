// {
//     email: "",
//     password: "",
// }
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
});

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

module.exports = userSchema;
module.exports = productScheme;
