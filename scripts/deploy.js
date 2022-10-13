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

const { deployProxy } = require("@openzeppelin/truffle-upgrades");
const PurseTokenUpgradable = artifacts.require("PurseTokenUpgradable.sol");
const PurseStakingV2 = artifacts.require("PurseStakingV2");

module.exports = async function (deployer) {
  const purseTokenUpgradable = await PurseTokenUpgradable.deployed();
  await deployProxy(PurseStakingV2, [purseTokenUpgradable.address], {
    deployer,
    kind: "uups",
  });
  const purseStakingV2 = await PurseStakingV2.deployed();
  await purseStakingV2.updateLockPeriod(1814400);
};
