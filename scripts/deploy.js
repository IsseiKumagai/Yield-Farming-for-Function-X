const { ethers } = require("hardhat");

async function main() {
  const Multicall2Contract = await ethers.getContractFactory("Multicall2");
  const multicall2contract = await Multicall2Contract.deploy();
  await multicall2contract.deployed();

  console.log("pursecontract address:", multicall2contract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
