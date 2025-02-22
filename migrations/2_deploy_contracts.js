const Escrow = artifacts.require("Escrow");
const SBT = artifacts.require("SBT");
const AdminManager = artifacts.require("AdminManager");

module.exports = async function (deployer, network, accounts) {
  try {
    // Deploy Escrow Contract
    await deployer.deploy(Escrow);
    const escrow = await Escrow.deployed();
    console.log("✅ Escrow deployed at:", escrow.address);

    // Deploy SBT Contract
    await deployer.deploy(SBT);
    const sbt = await SBT.deployed();
    console.log("✅ SBT deployed at:", sbt.address);

    // Deploy AdminManager Contract
    await deployer.deploy(AdminManager);
    const adminManager = await AdminManager.deployed();
    console.log("✅ AdminManager deployed at:", adminManager.address);

    // Store contract addresses for frontend
    // const fs = require("fs");
    // const addresses = {
    //   escrow: escrow.address,
    //   sbt: sbt.address,
    //   adminManager: adminManager.address,
    // };

    // fs.writeFileSync("./client/src/contracts/contractAddresses.json", JSON.stringify(addresses, null, 2));
  } catch (error) {
    console.error("❌ Deployment failed:", error);
  }
};
