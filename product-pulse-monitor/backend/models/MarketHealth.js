const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const marketHealthSchema = new Schema({
  //sales
  campanySales: { type: Number },
  marketSales: { type: Number },

  //customer satisfaction
  numSatisfactionRating: { type: Number },
  totalResponse: { type: Number },

  //customer rentenction
  numCustomerEnd: { type: Number },
  numCutomerBegin: { type: Number },
  numCustomerAcquired: { type: Number },

  //growth rate
  currentMarketShare: { type: Number },
  previousMarketShare: { type: Number },
});

module.exports = new mongoose.model("MarketHealth", marketHealthSchema);
