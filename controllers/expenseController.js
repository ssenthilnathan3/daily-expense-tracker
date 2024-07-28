const Expense = require('../models/expense');
const User = require('../models/user');
const { validateSplits } = require('../utils/validation'); // Assuming the function is in a separate utils/validation.js file

exports.addExpense = async (req, res) => {
  const { description, amount, paidBy, splitMethod, splits } = req.body;

  // Validate inputs
  if (!description || !amount || !paidBy || !splitMethod || !splits) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  // Validate users in splits
  for (const split of splits) {
    const user = await User.findOne({ email: split.user });
    if (!user) {
      return res.status(400).json({ error: `User ${split.user} does not exist.` });
    }
  }

  // Validate splits based on the split method
  if (!validateSplits(splitMethod, splits, amount)) {
    return res.status(400).json({ error: 'Invalid splits for the selected split method.' });
  }

  try {
    const expense = new Expense({ description, amount, paidBy, splitMethod, splits });
    await expense.save();
    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
