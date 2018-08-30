var SalesContractFactory = artifacts.require("SalesContract");

module.exports = function(deployer) {
  deployer.deploy(SalesContractFactory);
};