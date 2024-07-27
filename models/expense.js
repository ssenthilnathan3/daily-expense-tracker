const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  paidBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  splitMethod: { type: String, enum: ['equal', 'exact', 'percentage'], required: true },
  splits: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
      amount: { type: Number },
      percentage: { type: Number },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Expense', ExpenseSchema);
