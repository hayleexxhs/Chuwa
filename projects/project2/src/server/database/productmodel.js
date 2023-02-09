const mongoose = require("mongoose");
const productScheme = require("./productschema");

const Product = mongoose.model("Product", productScheme);

module.exports = Product;
