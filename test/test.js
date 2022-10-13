const { time } = require("@openzeppelin/test-helpers");
const { deployProxy } = require("@openzeppelin/truffle-upgrades");
const FXToken = artifacts.require("FXToken");
const YieldFarmer = artifacts.require("YieldFarmer");
const DummyLPToken = artifacts.require("DummyLPToken");

contract("YieldFarmer", ([issei, kumagai, john, minter]) => {
  beforeEach(async () => {
    this.FXTokenInstance = await deployProxy(FXToken, [100000000]);
    this.YieldFarmerInstance = await deployProxy(YieldFarmer, [
      this.FXTokenInstance.address,
      10000,
      1000,
    ]);
    this.dlpt1 = await deployProxy(DummyLPToken, [
      "DummyLPToken_1",
      "DLPT1",
      1000000000,
    ]);
    this.dlpt2 = await deployProxy(DummyLPToken, [
      "DummyLPToken_2",
      "DLPT2",
      1000000000,
    ]);
    this.dlpt3 = await deployProxy(DummyLPToken, [
      "DummyLPToken_3",
      "DLPT3",
      1000000000,
    ]);

    await this.dlpt1.transfer(kumagai, "2000", { from: minter });
    await this.dlpt2.transfer(kumagai, "2000", { from: minter });
    await this.dlpt3.transfer(kumagai, "2000", { from: minter });

    await this.dlpt1.transfer(issei, "2000", { from: minter });
    await this.dlpt2.transfer(issei, "2000", { from: minter });
    await this.dlpt3.transfer(issei, "2000", { from: minter });
  });
  it("real case", async () => {
    this.dlpt4 = await deployProxy(DummyLPToken, [
      "DummyLPToken_4",
      "DLPT4",
      1000000000,
    ]);
    this.dlpt5 = await deployProxy(DummyLPToken, [
      "DummyLPToken_5",
      "DLPT5",
      1000000000,
    ]);
    this.dlpt6 = await deployProxy(DummyLPToken, [
      "DummyLPToken_6",
      "DLPT6",
      1000000000,
    ]);
    this.dlpt7 = await deployProxy(DummyLPToken, [
      "DummyLPToken_7",
      "DLPT7",
      1000000000,
    ]);
    this.dlpt8 = await deployProxy(DummyLPToken, [
      "DummyLPToken_8",
      "DLPT8",
      1000000000,
    ]);
    this.dlpt9 = await deployProxy(DummyLPToken, [
      "DummyLPToken_9",
      "DLPT9",
      1000000000,
    ]);
    await this.YieldFarmerInstance.add("2000", this.dlpt1.address, true, {
      from: minter,
    });
    await this.YieldFarmerInstance.add("1000", this.dlpt2.address, true, {
      from: minter,
    });
    await this.YieldFarmerInstance.add("500", this.dlpt3.address, true, {
      from: minter,
    });
    await this.YieldFarmerInstance.add("500", this.dlpt3.address, true, {
      from: minter,
    });
    await this.YieldFarmerInstance.add("500", this.dlpt3.address, true, {
      from: minter,
    });
    await this.YieldFarmerInstance.add("500", this.dlpt3.address, true, {
      from: minter,
    });
    await this.YieldFarmerInstance.add("500", this.dlpt3.address, true, {
      from: minter,
    });
    await this.YieldFarmerInstance.add("100", this.dlpt3.address, true, {
      from: minter,
    });
    await this.YieldFarmerInstance.add("100", this.dlpt3.address, true, {
      from: minter,
    });
    assert.equal(
      (await this.YieldFarmerInstance.poolLength()).toString(),
      "10"
    );

    await time.advanceBlockTo("170");
    await this.dlpt1.approve(this.YieldFarmerInstance.address, "1000", {
      from: issei,
    });
    assert.equal((await this.FXTokenInstance.balanceOf(issei)).toString(), "0");
    await this.YieldFarmerInstance.deposit(1, "20", { from: issei });
    await this.YieldFarmerInstance.withdraw(1, "20", { from: issei });
    assert.equal(
      (await this.FXTokenInstance.balanceOf(issei)).toString(),
      "263"
    );

    await this.FXTokenInstance.approve(
      this.YieldFarmerInstance.address,
      "1000",
      { from: issei }
    );
    assert.equal(
      (await this.FXTokenInstance.balanceOf(issei)).toString(),
      "993"
    );
  });

  it("deposit/withdraw", async () => {
    await this.YieldFarmerInstance.add("1000", this.dlpt1.address, true, {
      from: minter,
    });
    await this.YieldFarmerInstance.add("1000", this.dlpt2.address, true, {
      from: minter,
    });
    await this.YieldFarmerInstance.add("1000", this.dlpt3.address, true, {
      from: minter,
    });

    await this.dlpt1.approve(this.YieldFarmerInstance.address, "100", {
      from: issei,
    });
    await this.YieldFarmerInstance.deposit(1, "20", { from: issei });
    await this.YieldFarmerInstance.deposit(1, "0", { from: issei });
    await this.YieldFarmerInstance.deposit(1, "40", { from: issei });
    await this.YieldFarmerInstance.deposit(1, "0", { from: issei });
    assert.equal((await this.dlpt1.balanceOf(issei)).toString(), "1940");
    await this.YieldFarmerInstance.withdraw(1, "10", { from: issei });
    assert.equal((await this.dlpt1.balanceOf(issei)).toString(), "1950");
    assert.equal(
      (await this.FXTokenInstance.balanceOf(issei)).toString(),
      "999"
    );
    assert.equal(
      (await this.FXTokenInstance.balanceOf(john)).toString(),
      "100"
    );

    await this.dlpt1.approve(this.YieldFarmerInstance.address, "100", {
      from: kumagai,
    });
    assert.equal((await this.dlpt1.balanceOf(kumagai)).toString(), "2000");
    await this.YieldFarmerInstance.deposit(1, "50", { from: kumagai });
    assert.equal((await this.dlpt1.balanceOf(kumagai)).toString(), "1950");
    await this.YieldFarmerInstance.deposit(1, "0", { from: kumagai });
    assert.equal(
      (await this.FXTokenInstance.balanceOf(kumagai)).toString(),
      "125"
    );
    await this.YieldFarmerInstance.emergencyWithdraw(1, { from: kumagai });
    assert.equal((await this.dlpt1.balanceOf(kumagai)).toString(), "2000");
  });

  it("staking/unstaking", async () => {
    await this.YieldFarmerInstance.add("1000", this.dlpt1.address, true, {
      from: minter,
    });
    await this.YieldFarmerInstance.add("1000", this.dlpt2.address, true, {
      from: minter,
    });
    await this.YieldFarmerInstance.add("1000", this.dlpt3.address, true, {
      from: minter,
    });

    await this.dlpt1.approve(this.YieldFarmerInstance.address, "100000", {
      from: issei,
    });
    await this.YieldFarmerInstance.deposit(1, "2", { from: issei }); //0
    await this.YieldFarmerInstance.withdraw(1, "2", { from: issei }); //1

    await this.FXTokenInstance.approve(
      this.YieldFarmerInstance.address,
      "250",
      { from: issei }
    );
    assert.equal(
      (await this.FXTokenInstance.balanceOf(issei)).toString(),
      "10"
    );
    assert.equal(
      (await this.FXTokenInstance.balanceOf(issei)).toString(),
      "249"
    );
    assert.equal(
      (await this.FXTokenInstance.balanceOf(issei)).toString(),
      "749"
    );
  });

  it("update multiplier", async () => {
    await this.YieldFarmerInstance.add("1000", this.dlpt1.address, true, {
      from: minter,
    });
    await this.YieldFarmerInstance.add("1000", this.dlpt2.address, true, {
      from: minter,
    });
    await this.YieldFarmerInstance.add("1000", this.dlpt3.address, true, {
      from: minter,
    });

    await this.dlpt1.approve(this.YieldFarmerInstance.address, "100", {
      from: issei,
    });
    await this.dlpt1.approve(this.YieldFarmerInstance.address, "100", {
      from: kumagai,
    });
    await this.YieldFarmerInstance.deposit(1, "100", { from: issei });
    await this.YieldFarmerInstance.deposit(1, "100", { from: kumagai });
    await this.YieldFarmerInstance.deposit(1, "0", { from: issei });
    await this.YieldFarmerInstance.deposit(1, "0", { from: kumagai });

    await this.FXTokenInstance.approve(
      this.YieldFarmerInstance.address,
      "100",
      { from: issei }
    );
    await this.FXTokenInstance.approve(
      this.YieldFarmerInstance.address,
      "100",
      { from: kumagai }
    );

    await this.YieldFarmerInstance.updateMultiplier("0", { from: minter });

    await this.YieldFarmerInstance.deposit(1, "0", { from: issei });
    await this.YieldFarmerInstance.deposit(1, "0", { from: kumagai });

    assert.equal(
      (await this.FXTokenInstance.balanceOf(issei)).toString(),
      "700"
    );
    assert.equal(
      (await this.FXTokenInstance.balanceOf(kumagai)).toString(),
      "150"
    );

    await time.advanceBlockTo("265");

    await this.YieldFarmerInstance.deposit(1, "0", { from: issei });
    await this.YieldFarmerInstance.deposit(1, "0", { from: kumagai });

    assert.equal(
      (await this.FXTokenInstance.balanceOf(issei)).toString(),
      "700"
    );
    assert.equal(
      (await this.FXTokenInstance.balanceOf(kumagai)).toString(),
      "150"
    );

    await this.YieldFarmerInstance.withdraw(1, "100", { from: issei });
    await this.YieldFarmerInstance.withdraw(1, "100", { from: kumagai });
  });
});
