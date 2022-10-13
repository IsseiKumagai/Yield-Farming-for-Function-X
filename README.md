# Yield-Farming-for-Function-X

### Install Dependencies

`yarn`

### Compile Contracts using Hardhat

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

### Deploy Contracts using Hardhat

- npx hardhat run deploy-factory.js --network fxcore
- Add the Factory and WFX address as constructor arguments inside `deploy-router.js` deployment script
- npx hardhat run deploy-router.js --network fxcore
