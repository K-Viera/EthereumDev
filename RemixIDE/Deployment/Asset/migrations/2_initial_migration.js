//2_initial_migration.js
const Asset = artifacts.require("Asset"); //Instancia de nuestro contrato CrowdFunding.sol

module.exports = function (deployer) {
  deployer.deploy(Asset); //Este script hace deploy de nuestro contrato a la blockchain
};