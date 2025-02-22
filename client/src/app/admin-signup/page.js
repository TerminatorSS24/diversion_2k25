"use client";
import { useState, useEffect } from "react";
import { addAdmin } from "../../utils/admin";

export default function AdminSignup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [account, setAccount] = useState(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const connectWallet = async () => {
    if (typeof window !== "undefined" && window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
      } catch (error) {
        console.error("Wallet connection failed:", error);
        setMessage("⚠️ Wallet connection failed.");
      }
    } else {
      alert("⚠️ MetaMask is not installed. Please install it to continue.");
    }
  };

  const handleSignup = async () => {
    if (!account) {
      setMessage("⚠️ Please connect your wallet first.");
      return;
    }

    try {
      // The 'from' must be the owner address. If the owner is the same as 'account', fine.
      // If your contract is owned by a different address, you'll need that address in MetaMask.
      await addAdmin(account, account, email, password);
      setMessage("✅ Admin registered successfully!");
    } catch (error) {
      console.error("Signup failed:", error);
      setMessage("❌ Signup failed.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      {isClient && (
        <div className="bg-white p-6 shadow-lg rounded-lg text-center w-96">
          <h1 className="text-2xl font-bold text-black">Admin Signup</h1>
          {!account ? (
            <button className="btn-glow mt-4 w-full" onClick={connectWallet}>
              Connect Wallet
            </button>
          ) : (
            <>
              <p className="text-green-400 mt-2">✅ Connected: {account}</p>
              <input
                type="email"
                placeholder="Email"
                className="input-field mt-2 w-full p-2 border border-gray-300 rounded"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="input-field mt-2 w-full p-2 border border-gray-300 rounded"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="btn-glow mt-4 w-full" onClick={handleSignup}>
                Sign Up
              </button>
              <p className="mt-2">Already have an account?</p>
              <a href="/admin-login">
                <button className="btn-glow w-full">Login</button>
              </a>
              {message && <p className="mt-2 text-red-400">{message}</p>}
            </>
          )}
        </div>
      )}
    </div>
  );
}
