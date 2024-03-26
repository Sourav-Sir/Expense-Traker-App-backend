// budgetController.js
const Budget = require('../models/Budget');
const Expense = require('../models/Expense');

// Set monthly budget limit
exports.setMonthlyBudget = async (req, res) => {
  try {
    const { userId, month, year, budgetAmount } = req.body; 

    // Check if a budget already exists for the given month and year
    let existingBudget = await Budget.findOne({ userId, month, year });

    // If a budget already exists, update the amount
    if (existingBudget) {
      existingBudget.budgetAmount = budgetAmount; 
    } else {
      // If no budget exists, create a new budget entry
      existingBudget = new Budget({ userId, month, year, budgetAmount });
    }

    await existingBudget.save();

    res.status(201).json({ message: 'Monthly budget limit set successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// View monthly budget limit
exports.getMonthlyBudget = async (req, res) => {
  try {
    const { userId, month, year } = req.body;

    // Find the budget for the given month and year
    const budget = await Budget.findOne({ userId, month, year });

    // If budget not found, return an appropriate message
    if (!budget) {
      return res.status(404).json({ message: 'Monthly budget not found' });
    }

    // If budget found, return the budget amount
    res.status(200).json({ budgetAmount: budget.budgetAmount }); 
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Check if the monthly budget limit is exceeded
exports.checkBudgetExceeded = async (req, res) => {
  try {
    const { userId } = req;
    const currentDate = new Date();
    const month = currentDate.getMonth() + 1; // January is 0, so we add 1
    const year = currentDate.getFullYear();

    // Fetch monthly budget
    const budget = await Budget.findOne({ userId, month, year });

    // Fetch total expenses for the current month
    const expenses = await Expense.find({ user: userId, month, year });
    const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);

    // Check if the budget is exceeded
    const budgetExceeded = totalExpenses > budget.budgetAmount;

    // Return response indicating budget status
    res.json({ budgetExceeded, totalExpenses, monthlyBudget: budget.budgetAmount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = exports;
