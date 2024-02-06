const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const upgradationSchema = new Schema({
  // release time
  timeTorelease: { type: Number },
  plannedTime: { type: Number },

  // automation coverage
  numTest: { type: Number },
  numTotalTest: { type: Number },

  //code review
  timeReview: { type: Number },
  totalTimeDevelopment: { type: Number },

  // uptime
  uptime: { type: Number },
  downtime: { type: Number },
});

module.exports = new mongoose.model("Upgradation", upgradationSchema);
