import Web3 from "web3";
import AdminManager from "../contracts/AdminManager.json"

// Replace these with your actual deployed AdminManager contract address and ABI
const adminAbi= AdminManager.abi;
const adminAddress = Object.values(AdminManager.networks)[0]?.address;
// const adminAbi = [
//     {
//       "anonymous": false,
//       "inputs": [
//         {
//           "indexed": true,
//           "internalType": "address",
//           "name": "adminAddress",
//           "type": "address"
//         },
//         {
//           "indexed": false,
//           "internalType": "string",
//           "name": "email",
//           "type": "string"
//         }
//       ],
//       "name": "AdminAdded",
//       "type": "event"
//     },
//     {
//       "anonymous": false,
//       "inputs": [
//         {
//           "indexed": true,
//           "internalType": "address",
//           "name": "adminAddress",
//           "type": "address"
//         }
//       ],
//       "name": "AdminRemoved",
//       "type": "event"
//     },
//     {
//       "anonymous": false,
//       "inputs": [
//         {
//           "indexed": true,
//           "internalType": "address",
//           "name": "previousOwner",
//           "type": "address"
//         },
//         {
//           "indexed": true,
//           "internalType": "address",
//           "name": "newOwner",
//           "type": "address"
//         }
//       ],
//       "name": "OwnershipTransferred",
//       "type": "event"
//     },
//     {
//       "inputs": [],
//       "name": "owner",
//       "outputs": [
//         {
//           "internalType": "address",
//           "name": "",
//           "type": "address"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function",
//       "constant": true
//     },
//     {
//       "inputs": [],
//       "name": "renounceOwnership",
//       "outputs": [],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "newOwner",
//           "type": "address"
//         }
//       ],
//       "name": "transferOwnership",
//       "outputs": [],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "_admin",
//           "type": "address"
//         },
//         {
//           "internalType": "string",
//           "name": "_email",
//           "type": "string"
//         },
//         {
//           "internalType": "bytes32",
//           "name": "_passwordHash",
//           "type": "bytes32"
//         }
//       ],
//       "name": "addAdmin",
//       "outputs": [],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "_admin",
//           "type": "address"
//         }
//       ],
//       "name": "removeAdmin",
//       "outputs": [],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "_admin",
//           "type": "address"
//         }
//       ],
//       "name": "isAdmin",
//       "outputs": [
//         {
//           "internalType": "bool",
//           "name": "",
//           "type": "bool"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function",
//       "constant": true
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "_admin",
//           "type": "address"
//         }
//       ],
//       "name": "getAdminEmail",
//       "outputs": [
//         {
//           "internalType": "string",
//           "name": "",
//           "type": "string"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function",
//       "constant": true
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "_admin",
//           "type": "address"
//         },
//         {
//           "internalType": "bytes32",
//           "name": "_passwordHash",
//           "type": "bytes32"
//         }
//       ],
//       "name": "verifyAdmin",
//       "outputs": [
//         {
//           "internalType": "bool",
//           "name": "",
//           "type": "bool"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function",
//       "constant": true
//     }
//   ]

let web3 = null;

if (typeof window !== "undefined" && window.ethereum) {
  web3 = new Web3(window.ethereum);
} else {
  console.warn("⚠️ MetaMask is not installed! Please install it.");
}

const getAdminContract = () => {
  if (!web3) return null;
  if (!adminAddress || adminAbi.length === 0) {
    console.error("⚠️ AdminManager contract data is missing or incomplete.");
    return null;
  }
  return new web3.eth.Contract(adminAbi, adminAddress);
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
