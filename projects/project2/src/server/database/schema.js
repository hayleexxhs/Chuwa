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

module.exports = userSchema;
