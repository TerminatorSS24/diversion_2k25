 "use client";
import { useState, useEffect } from "react";
import { addAdmin } from "../../utils/admin";
import { useRouter } from "next/navigation";

export default function AdminSignup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [account, setAccount] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#004c5a] via-[#004c5a] via-35% to-[#ffffff] text-white">
      {/* Navbar */}
      <nav className="absolute top-0 w-full flex justify-between items-center bg-teal-800 text-white p-4 shadow-md">
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
            Contact Us
          </li>
        </ul>
      </nav>

      {/* Signup Form */}
      {isClient && (
        <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-96 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Admin Signup</h1>
          {!account ? (
            <button
              className="bg-teal-800 text-white py-2 px-4 rounded-full hover:bg-teal-700 transition"
              onClick={connectWallet}
            >
              Connect Wallet
            </button>
          ) : (
            <>
              <p className="text-green-500 mt-2 px-0">✅ Connected: {account}</p>
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
                className="bg-teal-800 text-white mt-4 py-2 px-4 w-full rounded-full hover:bg-teal-700 transition"
                onClick={handleSignup}
              >
                Sign Up
              </button>
              <p className="mt-2 text-black text-sm ">Already have an account?</p>
              <a href="/admin-login">
                <button
                  className="bg-teal-800 text-white mt-4 py-2 px-4 w-full rounded-full hover:bg-teal-700 transition"
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
