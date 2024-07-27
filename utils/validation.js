exports.validateSplits = (splitMethod, splits, amount) => {
    switch (splitMethod) {
      case 'equal':
        return splits.every(split => split.amount === amount / splits.length);
      case 'exact':
        return splits.reduce((acc, split) => acc + split.amount, 0) === amount;
      case 'percentage':
        return splits.reduce((acc, split) => acc + split.percentage, 0) === 100;
      default:
        return false;
    }
  };
  