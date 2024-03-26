const express = require('express');
const router = express.Router();
const budgetController = require('../controllers/budgetController');
const authMiddleware = require('../middleware/authMiddleware');

// Set monthly budget limit
router.post('/', authMiddleware.authenticateUser, budgetController.setMonthlyBudget);

// Get monthly budget limit
router.get('/', authMiddleware.authenticateUser, budgetController.getMonthlyBudget);

// Check if the monthly budget limit is exceeded
router.get('/check-budget-exceeded', authMiddleware.authenticateUser, budgetController.checkBudgetExceeded);

module.exports = router;
