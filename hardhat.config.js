require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ethers");
require("@openzeppelin/hardhat-upgrades");
//require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();
module.exports = {
  solidity: "0.8.4",
  defaultNetwork: "fxcore",
  networks: {
    fxcore: {
      url: "https://testnet-fx-json-web3.functionx.io:8545",
      chainId: 90001,
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    },
  },
};

// networks: {
//   fxcore: {
//     url: "https://testnet-fx-json-web3.functionx.io:8545",
//     chainId: 530,
//     accounts: [`0x${process.env.PRIVATE_KEY}`]
//   }
// }
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
