const { ethers, upgrades } = require("hardhat");

async function main() {
  //const gas = await ethers.provider.getGasPrice();
  const V1contract = await ethers.getContractFactory("YieldFarmer");
  console.log("Deploying YieldFarmer contract...");
  // const v1contract = await upgrades.deployProxy(V1contract, [10], {
  //   gasPrice: gas,
  //   initializer: "initialize",
  // });
  const v1contract = await upgrades.deployProxy(
    V1contract,
    ["0x80b5a32e4f032b2a058b4f29ec95eefeeb87adcd", 10000, 10000],
    { kind: "uups" }
  );
  await v1contract.deployed();
  console.log("V1 Contract deployed to:", v1contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
