const mongoose = require("mongoose");

const stadiumSchema = new mongoose.Schema({
  standName: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("stand", stadiumSchema);
