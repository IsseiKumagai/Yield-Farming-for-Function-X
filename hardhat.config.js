require("@nomicfoundation/hardhat-toolbox");

const { privateKey } = require("./secrets.json");

//const GOERLI_PRIVATE_KEY = "1d42bafda1878128f3fc8c63b45e6abf4d028e238812871f94b054d22dae9a46";

module.exports = {
  solidity: "0.8.4",
  defaultNetwork: "fxcore",
  networks: {
    fxcore: {
      url: `https://testnet-fx-json-web3.functionx.io:8545`,
      chainId: 90001,
      accounts: [privateKey],
    },
  },
};
