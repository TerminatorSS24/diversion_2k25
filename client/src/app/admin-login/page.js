"use client";
import { useState, useEffect } from "react";
import { verifyAdmin } from "../../utils/admin";

export default function AdminLogin() {
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

  const handleLogin = async () => {
    if (!account) {
      setMessage("⚠️ Please connect your wallet first.");
      return;
    }

    try {
      // We call verifyAdmin with the currently connected address and the hashed password
      const isValid = await verifyAdmin(account, password);

      if (isValid) {
        setMessage("✅ Login successful!");
        // redirect or do something else
      } else {
        setMessage("❌ Invalid credentials or not an admin.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setMessage("❌ An error occurred during login.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      {isClient && (
        <div className="bg-white p-6 shadow-lg rounded-lg text-center w-96">
          <h1 className="text-2xl font-bold text-black">Admin Login</h1>
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
              <button className="btn-glow mt-4 w-full" onClick={handleLogin}>
                LOGIN
              </button>
              <p className="mt-2">Don&apos;t have an account?</p>
              <a href="/admin-signup">
                <button className="btn-glow w-full">Sign Up</button>
              </a>
              {message && <p className="mt-2 text-red-400">{message}</p>}
            </>
          )}
        </div>
      )}
    </div>
  );
}
