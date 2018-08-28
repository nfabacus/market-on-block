var SalesContractFactory = artifacts.require("SalesContractFactory");

module.exports = function(deployer) {
  deployer.deploy(SalesContractFactory);
};