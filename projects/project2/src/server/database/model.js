const mongoose = require("mongoose");
const userSchema = require("./schema");
const productScheme = require("./schema");

const User = mongoose.model("User", userSchema);
const Product = mongoose.model("Product", productScheme);

module.exports = User;
module.exports = Product;
