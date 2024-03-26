// Budget.js
const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  month: {
    type: Number,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  budgetAmount: { 
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Budget', budgetSchema);
