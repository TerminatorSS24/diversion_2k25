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
  console.warn("⚠ MetaMask is not installed! Please install it.");
}

const getAdminContract = () => {
  if (!web3) return null;
  if (!adminAddress || adminAbi.length === 0) {
    console.error("⚠ AdminManager contract data is missing or incomplete.");
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
// admin.js
// import mysql from "mysql2/promise";
// import dbConfig from "../utils/db";
const dbConfig = {
  host: "localhost",
  user: "root", // Default XAMPP MySQL username
  password: "", // Default XAMPP MySQL password (empty)
  database: "admin_db", // Replace with your database name
};
// const dbConfig = {
//   host: "localhost",
//   user: "root", // Default XAMPP MySQL username
//   password: "", // Default XAMPP MySQL password (empty)
//   database: "admin_db", // Replace with your database name
// };

/**
 * Verify admin credentials against the MySQL database.
 * @param {string} walletAddress - The wallet address of the admin.
 * @param {string} password - The password of the admin.
 * @returns {Promise<boolean>} - True if the credentials are valid, false otherwise.
 */
// utils/admin.js
import mysql from "mysql2/promise";


/**
 * Verify admin credentials against the MySQL database.
 * @param {string} walletAddress - The wallet address of the admin.
 * @param {string} password - The password of the admin.
 * @returns {Promise<boolean>} - True if the credentials are valid, false otherwise.
 */
export const verifyAdmin = async (walletAddress, password) => {
  try {
    // Create a connection to the database
    const connection = await mysql.createConnection(dbConfig);

    // Fetch admin data from the database
    const [rows] = await connection.execute(
      `SELECT * FROM admins WHERE walletAddress = ? AND password = ?`,
      [walletAddress, password]
    );

    // Close the connection
    await connection.end();

    // If a matching admin is found, return true
    if (rows.length > 0) {
      console.log("✅ Admin verified successfully!");
      return true;
    } else {
      console.error("❌ Invalid credentials or not an admin.");
      return false;
    }
  } catch (error) {
    console.error("❌ Error verifying admin:", error);
    throw error;
  }
};

export { web3, getAdminContract, addAdmin, verifyAdmin };