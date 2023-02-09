const mongoose = require("mongoose");
const userSchema = require("./userschema");

const User = mongoose.model("User", userSchema);

module.exports = User;
