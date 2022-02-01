const { deployProxy } = require('@openzeppelin/truffle-upgrades');

const { getSettings } = require("./config.js")

const ExchangeV2 = artifacts.require('ExchangeV2');
const RoyaltiesRegistry = artifacts.require("RoyaltiesRegistry");
const ERC20TransferProxy = artifacts.require('ERC20TransferProxy');
const TransferProxy = artifacts.require('TransferProxy');

module.exports = async function (deployer, network) {
  console.log("ExV2: ", network);
  const { communityWallet } = getSettings(network);

  const transferProxy = (await TransferProxy.deployed()).address;
  const erc20TransferProxy = (await ERC20TransferProxy.deployed()).address;
  const royaltiesRegistry = (await RoyaltiesRegistry.deployed()).address;
  const protocolFeeinBp = 500; //THIS NEEDS TO MATCH THE "fees" VARIABLE IN THE SDK CONFIG

  const exchangeV2 = await deployProxy(
    ExchangeV2,
    [transferProxy, erc20TransferProxy, protocolFeeinBp, communityWallet, royaltiesRegistry],
    { deployer, initializer: '__ExchangeV2_init' }
  );
  console.log("deployed exchangeV2 at", exchangeV2.address)
};