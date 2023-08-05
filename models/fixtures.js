const mongoose = require("mongoose");
const fixtureSchema = new mongoose.Schema({
  opponent: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: true,
  },
  shortName: {
    type: String,
    required: true,
  },
  matchTime: {
    type: Date,
    required: true,
  },
  matchType: {
    type: String,
    required: true,
  },
  totalMatch: {
    type: Number,
    required: true,
  },
  win: {
    type: Number,
    required: true,
  },
  draw: {
    type: Number,
    required: true,
  },
  winProbability: {
    type: Number,
    required: true,
  },
  home: {
    type: String,
    required: true,
  },
  access:{
    type:Boolean,
    default:true
  }
});

module.exports = mongoose.model("fixture", fixtureSchema);
