const mongoose = require('mongoose');

// Define the ticket schema
const ticketSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
 
  status: {
    type: Boolean,
  },
  createdBy: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  matchId:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  }
});

module.exports = mongoose.model('ticket', ticketSchema);

