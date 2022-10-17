# Yield-Farming-for-Function-X

### Install Dependencies

`yarn`

### Compile Contracts using Hardhat [For Mainnet]

- Add fxcore network in `hardhat.config.js`:

```
require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ethers");
require("@openzeppelin/hardhat-upgrades");
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
```

- npx hardhat compile
- npx hardhat run scripts/deploy.js --network fxcore

### Notes

- Need to manually verify contracts. Go to: https://starscan.io/
