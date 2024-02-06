const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const qualitySchema = new Schema({
  //defect
  numDefects: { type: Number },
  sizeOfProduct: { type: Number },

  // Testing coverage
  numTestedLines: { type: Number },

  //MTBF
  failureTime: { type: Number },
  operatingTime: { type: Number },

  // bug fix turnaround time
  numreopenedIssue: { type: Number },
  numTotalIssue: { type: Number },
});

module.exports = new mongoose.model("Quality", qualitySchema);
