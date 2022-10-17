const { ethers, upgrades } = require("hardhat");
// address of the original proxy contract
const UPGRADEABLE_PROXY = "0x795750E50212c064c8A414529955D1AE94783F3a";

async function main() {
  const YieldFarmerV2 = await ethers.getContractFactory("YieldFarmerV2");
  console.log("Upgrading YieldFarmer Contract...");
  const upgrade = await upgrades.upgradeProxy(UPGRADEABLE_PROXY, YieldFarmerV2);
  console.log("YieldFarmer Upgraded to YieldFarmerV2");
  console.log("YieldFarmerV2 Contract Deployed To:", upgrade.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
