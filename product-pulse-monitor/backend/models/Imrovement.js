const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const improvementSchema = new Schema({
  //nps
  promoters: { type: Number },
  detractors: { type: Number },

  // user engagement
  engagedUser: { type: Number },
  totalUser: { type: Number },

  // produt usability
  usabilityScore: { type: Number },
  maxUsabilityScore: { type: Number },

  // User Feedback Incorporation
  feedBackImplemented: { type: Number },
  totalFeedback: { type: Number },
});

module.exports = new mongoose.model("Improvement", improvementSchema);
