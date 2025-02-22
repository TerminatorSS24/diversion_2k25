import Web3 from "web3";
import EscrowContract from "../contracts/Escrow.json";  // Import ABI
import SBTContract from "../contracts/SBT.json";  // Import ABI

let web3;
let escrow;
let sbt;

if (typeof window !== "undefined" && window.ethereum) {
    web3 = new Web3(window.ethereum);

    // Get network ID from Truffle deployment
    const networkId = Object.keys(EscrowContract.networks)[0];
    
    escrow = new web3.eth.Contract(
        EscrowContract.abi,
        EscrowContract.networks[networkId]?.address
    );

    sbt = new web3.eth.Contract(
        SBTContract.abi,
        SBTContract.networks[networkId]?.address
    );

    window.ethereum.request({ method: "eth_requestAccounts" });
}

export { web3, escrow, sbt };
