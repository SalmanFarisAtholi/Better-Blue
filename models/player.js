const mongoose = require("mongoose");
const playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  place: {
    type: String,
    required: true,
  },
  DOB: {
    type: Date,
    required: true,
  },
  nationality: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    default: 0,
  },
  totalMatch: {
    type: Number,
    default: 0,
  },
  goal: {
    type: Number,
    default: 0,
  },
  assist: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("player", playerSchema);
