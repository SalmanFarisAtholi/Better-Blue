const mongoose = require("mongoose");
const opponentSchema = new mongoose.Schema({
  name: {
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
});

module.exports = mongoose.model("opponent", opponentSchema);
