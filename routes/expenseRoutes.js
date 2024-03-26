const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');
const authMiddleware = require('../middleware/authMiddleware');

// Create a new expense
router.post('/', authMiddleware.authenticateUser, expenseController.createExpense);

// Get all expenses
router.get('/', authMiddleware.authenticateUser, expenseController.getAllExpenses);

// Update an expense
router.put('/:id', authMiddleware.authenticateUser, expenseController.updateExpense);

// Delete an expense
router.delete('/:id', authMiddleware.authenticateUser, expenseController.deleteExpense);

module.exports = router;
