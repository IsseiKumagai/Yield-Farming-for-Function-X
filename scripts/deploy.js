const { ethers } = require("hardhat");

async function main() {
  const FarmContract = await ethers.getContractFactory("RestakingFarm");
  const farmcontract = await FarmContract.deploy();

  console.log("FarmContract address:", farmcontract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
