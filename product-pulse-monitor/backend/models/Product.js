const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: { type: String, required: true },
  userId: { type: String, required: true },

  healthId: { type: String },
  qualityId: { type: String },
  innovationId: { type: String },
  salesId: { type: String },
  upgradationId: { type: String },
  improvementId: { type: String },
});

module.exports = new mongoose.model("Product", productSchema);
