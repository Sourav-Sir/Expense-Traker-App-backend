// expenseController.js
const Expense = require('../models/Expense');
const Budget = require('../models/Budget');

// Create a new expense
exports.createExpense = async (req, res) => {
  try {
    const { amount, category, date } = req.body;
    const userId = req.userId;

    // Create new expense object
    const newExpense = new Expense({
      amount,
      category,
      date: date || new Date(), // Use provided date or current date if not provided
      user: userId, // Associate the user's ID with the expense
    });

    // Save expense to the database
    await newExpense.save();

    // Deduct the expense amount from the current month's budget
    await Budget.findOneAndUpdate(
      { userId, month: new Date().getMonth() + 1, year: new Date().getFullYear() },
      { $inc: { amount: -amount } }
    );

    res.status(201).json({ message: 'Expense created successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all expenses for the authenticated user
exports.getAllExpenses = async (req, res) => {
    try {
      const userId = req.userId;
  
      // Retrieve all expenses for the authenticated user from the database
      const expenses = await Expense.find({ user: userId });
  
      // Fetch monthly budget
      const currentDate = new Date();
      const month = currentDate.getMonth() + 1; // January is 0, so we add 1
      const year = currentDate.getFullYear();
      const budget = await Budget.findOne({ userId, month, year });
  
      // Calculate total spent
      let totalSpent = 0;
      expenses.forEach(expense => {
        totalSpent += expense.amount;
      });
  
      // Check if budget is exceeded
      let budgetAmount = 0;
      let budgetExceeded = false;
      if (budget) {
        budgetAmount = budget.budgetAmount;
        budgetExceeded = totalSpent > budget.budgetAmount;
      }
  
      // Update expenses with calculated fields
      expenses.forEach(expense => {
        expense.budgetAmount = budgetAmount;
        expense.totalSpent = totalSpent;
        expense.budgetExceeded = budgetExceeded;
      });
  
      // Send the expenses data as a response
      res.json({ expenses });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

// Update an expense
exports.updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, category, date } = req.body;

    // Find expense by ID
    let expense = await Expense.findById(id);

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    // Update expense properties
    expense.amount = amount || expense.amount;
    expense.category = category || expense.category;
    expense.date = date || expense.date;

    // Save updated expense to the database
    await expense.save();

    res.json({ message: 'Expense updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete an expense
exports.deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;

    // Find expense by ID and delete it
    const deletedExpense = await Expense.findByIdAndDelete(id);

    if (!deletedExpense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    res.json({ message: 'Expense deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = exports;
