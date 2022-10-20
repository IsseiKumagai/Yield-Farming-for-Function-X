const { ethers, upgrades } = require("hardhat");

async function main() {
  const YieldFarmer = await ethers.getContractFactory("YieldFarmer");
  console.log("Deploying YieldFarmer contract...");
  const rewardTokenAddress = "0x80b5a32e4f032b2a058b4f29ec95eefeeb87adcd"; // WFX token address
  const rewardPerBlock = "270000000000000000"; // in wei
  const startBlock = 5214238; // block height
  const yieldFarmer = await upgrades.deployProxy(
    YieldFarmer,
    [rewardTokenAddress, rewardPerBlock, startBlock],
    { kind: "uups" }
  );
  await yieldFarmer.deployed();
  console.log("YieldFarmer Contract deployed to:", yieldFarmer.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
