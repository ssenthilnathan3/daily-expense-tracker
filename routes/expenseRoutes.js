const express = require('express');
const { addExpense, getUserExpenses, getOverallExpenses, downloadBalanceSheet } = require('../controllers/expenseController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/expenses', auth, addExpense);
router.get('/expenses/user/:userId', auth, getUserExpenses);
router.get('/expenses', auth, getOverallExpenses);
router.get('/balance-sheet', auth, downloadBalanceSheet);

module.exports = router;

