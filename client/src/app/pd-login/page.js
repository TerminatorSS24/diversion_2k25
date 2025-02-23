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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#004c5a] via-[#004c5a] via-35% to-[#ffffff] text-white">
      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full flex justify-between items-center bg-teal-800 text-white p-4 shadow-md">
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

      <div className="bg-white p-8 shadow-lg rounded-lg w-96 text-center border-t-4 border-purple-500 mt-16">
      <h1 className="text-2xl font-bold text-black">Project Distributor Login</h1>
      <button className="bg-teal-800 text-white py-2 px-4 rounded-full hover:bg-teal-700 transition" onClick={connectWallet}>
        Connect Wallet
      </button>

      {account && (
        <>
          <p className="text-blue-400 mt-2 text-center">Connected: {account}</p>
          <button className="bg-teal-800 text-white py-2 px-4 rounded-full hover:bg-teal-700 transition mt-2" onClick={() => router.push("/pd-dashboard")}>
            Go to Dashboard
          </button>
        </>
      )}
      </div>
    </div>
  );
}
