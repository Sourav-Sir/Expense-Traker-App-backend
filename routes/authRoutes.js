// routes/authRoutes.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const budgetController = require('../controllers/budgetController');
const authMiddleware = require('../middleware/authMiddleware');

// Register a new user
router.post('/register', authController.register);

// Login user
router.post('/login', authController.login);

// Set monthly budget limit
router.post('/budget', authMiddleware.authenticateUser, budgetController.setMonthlyBudget);

// View monthly budget limit
router.get('/budget', authMiddleware.authenticateUser, budgetController.getMonthlyBudget);

module.exports = router;
