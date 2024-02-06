const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const saleSchema = new Schema({
  //revenue growth
  currentRevenue: { type: Number },
  prevRevenue: { type: Number },

  //conversion
  numPaying: { type: Number },
  numLeads: { type: Number },

  //Sales Pipeline Health
  numDealsinProgress: { type: Number },
  totalDeals: { type: Number },

  // churn rate
  numCustStart: { type: Number },
  numCustEnd: { type: Number },
});

module.exports = new mongoose.model("Sale", saleSchema);
