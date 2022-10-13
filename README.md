# Yield-Farming-for-Function-X

### Install Dependencies

`yarn`

### Compile Contracts using Hardhat [For Mainnet]

- Add fxcore network in `hardhat.config.js`:

```
networks: {
    fxcore: {
      url: "https://fx-json-web3.functionx.io:8545",
      chainId: 530,
      accounts: [`0x${privateKey}`]
    }
}
```

- npx hardhat compile
