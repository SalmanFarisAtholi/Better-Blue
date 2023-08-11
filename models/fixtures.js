const mongoose = require("mongoose");
const fixtureSchema = new mongoose.Schema({
  opponentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "opponent",
  },
  matchTime: {
    type: Date,
    required: true,
  },
  matchType: {
    type: String,
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
  access: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("fixture", fixtureSchema);
