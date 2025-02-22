// import Web3 from "web3";

// let web3 = null;

// if (typeof window !== "undefined" && window.ethereum) {
//   web3 = new Web3(window.ethereum);
// } else {
//   console.warn("⚠️ MetaMask is not installed! Please install it.");
// }

// const getAdminContract = (contractAddress, abi) => {
//   if (!web3) {
//     throw new Error("⚠️ Web3 is not initialized! Please connect MetaMask.");
//   }
//   if (!contractAddress || !abi) {
//     throw new Error("⚠️ Contract address or ABI is missing.");
//   }

//   return new web3.eth.Contract(abi, contractAddress);
// };

// /**
//  * @dev Sign up (adds admin on blockchain)
//  */
// const addAdmin = async (from, contractAddress, email, password) => {
//   const adminABI = await fetch("/api/contract").then((res) => res.json()).then((data) => data.abi);

//   const adminContract = getAdminContract(contractAddress, adminABI);
//   if (!adminContract) {
//     throw new Error("Admin contract not initialized. Ensure MetaMask is connected.");
//   }

//   const passwordHash = web3.utils.soliditySha3(password);

//   try {
//     const result = await adminContract.methods
//       .addAdmin(from, email, passwordHash)
//       .send({ from, gasPrice: web3.utils.toWei("20", "gwei") });

//     console.log("✅ Admin added:", result);
//     return result;
//   } catch (error) {
//     console.error("❌ Error adding admin:", error);
//     throw error;
//   }
// };

// export { web3, getAdminContract, addAdmin };

import Web3 from "web3";
import contractAddresses from "../contracts/contractAddresses.json"; 

let web3 = null;

if (typeof window !== "undefined" && window.ethereum) {
  web3 = new Web3(window.ethereum);
} else {
    console.warn("⚠️ MetaMask is not installed! Please install it.");
}

const getAdminContract = () => {
    if (!web3) return null;

    const adminData = contractAddresses.adminManager; // Must match the key in your JSON
    if (!adminData || !adminData.abi || !adminData.address) {
        console.error("⚠️ AdminManager contract data is missing or incomplete.");
        return null;
    }

    return new web3.eth.Contract(adminData.abi, adminData.address);
};

/**
 * @dev Sign up (only the owner can add an admin, so from must be the owner address)
 */
const addAdmin = async (from, adminAddress, email, password) => {
  const adminContract = getAdminContract();
  if (!adminContract) {
    throw new Error("Admin contract not initialized. Ensure MetaMask is connected.");
  }

  // Hash the password
  const passwordHash = web3.utils.soliditySha3(password);

  try {
    const result = await adminContract.methods
      .addAdmin(adminAddress, email, passwordHash)
      .send({ from, gasPrice: web3.utils.toWei("20", "gwei") });
    console.log("✅ Admin added:", result);
    return result;
  } catch (error) {
    console.error("❌ Error adding admin:", error);
    throw error;
  }
};

/**
 * @dev Login: we just verify the admin address and password hash
 */
const verifyAdmin = async (adminAddress, password) => {
  const adminContract = getAdminContract();
  if (!adminContract) {
    throw new Error("Admin contract not initialized. Ensure MetaMask is connected.");
  }

  // Hash the password
  const passwordHash = web3.utils.soliditySha3(password);

  try {
    // This calls the "verifyAdmin" function in the contract
    const isValid = await adminContract.methods
      .verifyAdmin(adminAddress, passwordHash)
      .call();

    console.log("✅ Admin verified:", isValid);
    return isValid;
  } catch (error) {
    console.error("❌ Error verifying admin:", error);
    throw error;
  }
};

export { web3, getAdminContract, addAdmin, verifyAdmin };
