"use client";
import { useState } from "react";
import { ethers } from "ethers";
import { useRouter } from "next/navigation";

export default function PDLogin() {
  const [account, setAccount] = useState(null);
  const router = useRouter();

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        setAccount(accounts[0]); // Store the connected account
      } catch (error) {
        console.error("Wallet connection failed:", error);
      }
    } else {
      alert("MetaMask is not installed. Please install it to continue.");
    }
  };

  return (
    <div className="login-container">
      <h1 className="text-2xl font-bold text-black">Project Distributor Login</h1>
      <button className="btn-glow mt-4" onClick={connectWallet}>
        Connect Wallet
      </button>

      {account && (
        <>
          <p className="text-green-400 mt-2">Connected: {account}</p>
          <button className="btn-glow mt-4" onClick={() => router.push("/pd-dashboard")}>
            Go to Dashboard
          </button>
        </>
      )}
    </div>
  );
}
