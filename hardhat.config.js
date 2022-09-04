require("@nomicfoundation/hardhat-toolbox");

const { privateKey } = require("./secrets.json");

// Go to https://www.alchemyapi.io, sign up, create
// a new App in its dashboard, and replace "KEY" with its key

//const ALCHEMY_API_KEY = "p5h-EeXKO5wUVvfmA5R_88OjYxUgHy6R";

// Replace this private key with your Goerli account private key
// To export your private key from Metamask, open Metamask and
// go to Account Details > Export Private Key
// Beware: NEVER put real Ether into testing accounts

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
