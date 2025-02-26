 "use client";
import { useState, useEffect } from "react";
import { verifyAdmin } from "../../utils/admin";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
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
    if (typeof window !== "undefined" && window.ethereum && window.ethereum.isMetaMask) {
      try {
        console.log("MetaMask detected.");
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          setMessage("✅ Wallet connected successfully.");
        } else {
          setMessage("⚠️ No accounts found. Please try again.");
        }
      } catch (error) {
        console.error("Wallet connection failed:", error);
        setMessage("⚠️ Wallet connection failed. Check console for details.");
      }
    } else {
      alert("⚠️ MetaMask is not installed or not detected. Please install it to continue.");
    }
  };

  const handleLogin = async () => {
    if (!account) {
      setMessage("⚠️ Please connect your wallet first.");
      return;
    }

    try {
      // Call the verifyAdmin API route
      const response = await fetch("/api/verifyAdmin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          walletAddress: account,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("✅ Login successful!");
        router.push("/admin-dashboard");
      } else {
        setMessage(`❌ ${data.error}`);
      }
    } catch (error) {
      console.error("Login failed:", error);
      setMessage("❌ An error occurred during login.");
    }
  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-[#004c5a] via-[#004c5a] via-35% to-[#ffffff] text-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center bg-teal-800 text-white p-4 shadow-md">
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
      </nav>

      {/* Main Content */}
      <div className="flex items-center justify-center h-[80vh]">
        {isClient && (
          <div className="bg-white p-8 shadow-lg rounded-lg w-96 text-center border-t-4 border-purple-500">
            <h1 className="text-2xl text-black font-bold mb-4">Admin Login</h1>
            {!account ? (
              <button
                className="bg-teal-800 text-white py-2 px-4 rounded-full hover:bg-teal-700 transition"
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
                  className="mt-4 w-full p-2 border border-gray-300 rounded"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="mt-4 w-full p-2 border border-gray-300 rounded"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  className="bg-teal-800 text-white mt-4 py-2 px-4 w-full rounded-full hover:bg-teal-700 transition"
                  onClick={handleLogin}
                >
                  LOGIN
                </button>
                <p className="mt-2  text-black text-sm">Don&apos;t have an account?</p>
                <a href="/admin-signup">
                  <button className="bg-teal-800 text-white mt-4 py-2 px-4 w-full rounded-full hover:bg-teal-700 transition">
                    Sign Up
                  </button>
                </a>
                {message && <p className="mt-2 text-red-400">{message}</p>}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}