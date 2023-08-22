const mongoose = require("mongoose");

// Define the ticket schema
const ticketSchema = new mongoose.Schema(
  {
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    matchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "fixture",
      required: true,
    },
    date: {
      type: Date,
    },
    stand: {
      type: String,
      required: true,
    },

    members: [
      {
        name: {
          type: String,
        },
        mobileNumber: {
          type: Number,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("ticket", ticketSchema);
