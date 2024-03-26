// Expense.js
const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  budgetAmount: { 
    type: Number,
    default: 0 // Default value set to 0
  },
  totalSpent: { 
    type: Number,
    default: 0 // Default value set to 0
  },
  budgetExceeded: { 
    type: Boolean,
    default: false // Default value set to false
  }
});

module.exports = mongoose.model('Expense', expenseSchema);
