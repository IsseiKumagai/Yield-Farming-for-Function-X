require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ethers");
require("@openzeppelin/hardhat-upgrades");
//require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();
console.log(process.env);
module.exports = {
  solidity: "0.8.4",
  defaultNetwork: "fxcore",
  networks: {
    fxcore: {
      url: "https://testnet-fx-json-web3.functionx.io:8545",
      chainId: 90001,
      accounts: [
        "adf61ef81bac4c793852d0f3527e162665284c44de1d1a6eefdc4fd59690a1c9",
      ],
    },
  },
};
// module.exports = {
//   solidity: "0.8.4",
//   defaultNetwork: "fxcore",
//   networks: {
//     fxcore: {
//       url: process.env.RPC_URL,
//       chainId: process.env.CHAIN_ID,
//       accounts: [process.env.PRIVATE_KEY],
//     },
//   },
// };
