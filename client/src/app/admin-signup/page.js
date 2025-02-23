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
        setMessage("⚠ Wallet connection failed.");
      }
    } else {
      alert("⚠ MetaMask is not installed. Please install it to continue.");
    }
  };

  const handleSignup = async () => {
    if (!account) {
      setMessage("⚠ Please connect your wallet first.");
      return;
    }

    try {
      await addAdmin(account, account, email, password);
      setMessage("✅ Admin registered successfully!");
    } catch (error) {
      console.error("Signup failed:", error);
      setMessage("❌ Signup failed.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#004c5a] via-[#004c5a] via-35% to-[#ffffff] text-white">
     
    {/* Navbar */}
    <nav className="flex justify-between items-center bg-teal-800 text-white p-4 shadow-md"></nav>
      <div
        className="text-lg font-bold ml-4 cursor-pointer"
        onClick={() => router.push("/")}
      >
        Gig-Escrow
      </div>
      <ul className="flex space-x-6 mr-4">
        <li
          className="hover:underline cursor-pointer"
          onClick={() => router.push("/")}
        >
          Home
        </li>
        <li
          className="hover:underline cursor-pointer"
          onClick={() => router.push("/about")}
        >
          About Us
        </li>
        <li
          className="hover:underline cursor-pointer"
          onClick={() => router.push("/contact")}
        >
          Contact-us
        </li>
      </ul>
    

      {isClient && (
        <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-96 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Admin Signup</h1>
          {!account ? (
            <button
              className="w-full py-2 px-4 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-lg hover:scale-105 transition-transform"
              onClick={connectWallet}
            >
              Connect Wallet
            </button>
          ) : (
            <>
              <p className="text-green-500 mt-2">✅ Connected: {account}</p>
              <input
                type="email"
                placeholder="Email"
                className="w-full p-2 mt-4 border border-gray-300 rounded"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full p-2 mt-4 border border-gray-300 rounded"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className="w-full py-2 px-4 mt-4 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-lg hover:scale-105 transition-transform"
                onClick={handleSignup}
              >
                Sign Up
              </button>
              <p className="mt-2 text-sm">Already have an account?</p>
              <a href="/admin-login">
                <button
                  className="w-full py-2 px-4 mt-2 bg-purple-500 text-white rounded-lg hover:scale-105 transition-transform"
                >
                  Login
                </button>
              </a>
              {message && <p className="mt-2 text-red-500">{message}</p>}
            </>
          )}
        </div>
      )}
    </div>
  );
}