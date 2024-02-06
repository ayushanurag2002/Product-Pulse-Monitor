const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const innovationSchema = new Schema({
  //adoption rate
  numNewFeatureAdopted: { type: Number },
  totalUsers: { type: Number },

  // prodcut update freq
  numNewIdeas: { type: Number },
  numIdeaPipeline: { type: Number },

  // time to mrket
  avgTimeToLaunch: { type: Number },
  plannedTime: { type: Number },

  // patents
  numPatent: { type: Number },
  totalInnovation: { type: Number },
});

module.exports = new mongoose.model("Innovation", innovationSchema);
