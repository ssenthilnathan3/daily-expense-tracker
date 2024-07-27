const Expense = require('../models/expense');
const User = require('../models/user');
const { validateSplits } = require('../utils/validation');
const { generateBalanceSheet } = require('../utils/balanceSheet');

exports.addExpense = async (req, res) => {
    try {
        const { description, amount, paidBy, splitMethod, splits } = req.body;

        if (!validateSplits(splitMethod, splits, amount)) {
            return res.status(400).json({ message: 'Invalid splits' });
        }

        const newExpense = new Expense({ description, amount, paidBy, splitMethod, splits });
        await newExpense.save();
        res.status(201).json(newExpense);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getUserExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find({ 'splits.user': req.params.userId }).populate('paidBy splits.user');
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getOverallExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find().populate('paidBy splits.user');
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.downloadBalanceSheet = async (req, res) => {
    try {
        const expenses = await Expense.find().populate('paidBy splits.user');
        const balanceSheet = generateBalanceSheet(expenses);
        res.status(200).json(balanceSheet);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
