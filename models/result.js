const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema(
  {
    ballPosition: {
      type: Number,
      required: true,
    },
    result: {
      type: String,
      required: true,
    },
    match: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "fixture",
      required: true,
    },
    scored: {
      type: Number,
      required: true,
    },
    conceded: {
      type: Number,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    ourShots: {
      type: Number,
      required: true,
    },
    thereShots: {
      type: Number,
      required: true,
    },
    ourTarget: {
      type: Number,
      required: true,
    },
    thereTarget: {
      type: Number,
      required: true,
    },
    ourCorner: {
      type: Number,
      required: true,
    },
    thereCorner: {
      type: Number,
      required: true,
    },
    ourFoules: {
      type: Number,
      required: true,
    },
    thereFoules: {
      type: Number,
      required: true,
    },

    goals: [
      {
        scorer: {
          type: String,
        },
        team: {
          type: String,
        },
        time: {
          type: Number,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("result", resultSchema);
