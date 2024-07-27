const generateBalanceSheet = (expenses) => {
    const balanceSheet = {};
    
    expenses.forEach(expense => {
      const paidBy = expense.paidBy.name;
      const amount = expense.amount;
  
      if (!balanceSheet[paidBy]) {
        balanceSheet[paidBy] = { paid: 0, owes: 0 };
      }
      balanceSheet[paidBy].paid += amount;
  
      expense.splits.forEach(split => {
        const user = split.user.name;
        const owesAmount = split.amount || (split.percentage / 100) * amount;
  
        if (!balanceSheet[user]) {
          balanceSheet[user] = { paid: 0, owes: 0 };
        }
        balanceSheet[user].owes += owesAmount;
      });
    });
  
    return balanceSheet;
  };
  
  module.exports = { generateBalanceSheet };
  