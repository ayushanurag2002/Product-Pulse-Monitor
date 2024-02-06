const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  fname: { type: String, required: true },
  lname: { type: String },
  username: { type: String, required: true, unique: true },
  productIdArray: { type: Array },
});

module.exports = new mongoose.model("User", userSchema);
