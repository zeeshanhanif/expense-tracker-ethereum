const ExpenseTracker = artifacts.require("ExpenseTracker");

module.exports = function(deployer) {
  deployer.deploy(ExpenseTracker);
};
