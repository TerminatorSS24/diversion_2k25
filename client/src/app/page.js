"use client";
import { useState } from "react";
import { ethers } from "ethers";
import {useRouter} from "next/navigation";

export default function Home() {
  const [account, setAccount] = useState(null);
  const router = useRouter();

  // Connect to MetaMask
  async function connectWallet() {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        setAccount(accounts[0]);
      } catch (error) {
        console.error("Wallet connection failed", error);
      }
    } else {
      alert("MetaMask is not installed!");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex flex-col items-center justify-center text-white p-6">
      <h1 className="text-4xl font-bold text-blue-500">Welcome to GigEscrow</h1>
      <p className="text-gray-400 mt-2">Choose your login role</p>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <button className="btn-glow" onClick={() => router.push("/pd-login")}>
          🚀 Login as Project Distributor
        </button>
        <button className="btn-glow" onClick={() => router.push("/freelancer-login")}>
          🎨 Login as Freelancer
        </button>
        <button className="btn-glow" onClick={() => router.push("/admin-login")}>
          🔐 Login as Admin
        </button>
      </div>
    </div>
    // <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex flex-col items-center justify-center text-white p-6">
      
    //   <h1 className="text-4xl font-bold text-blue-500">Welcome to GigEscrow</h1>
    //   <p className="text-gray-400 mt-2">Choose your login role</p>

    //   {/* Login Buttons */}
    //   <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
    //     <button className="btn-glow" onClick={connectWallet}>
    //       🚀 Login as Project Distributor
    //     </button>
    //     <button className="btn-glow" onClick={connectWallet}>
    //       🎨 Login as Freelancer
    //     </button>
    //     <button className="btn-glow" onClick={connectWallet}>
    //       🔐 Login as Admin
    //     </button>
    //   </div>

    //   {/* Show connected wallet */}
    //   {account && (
    //     <p className="mt-4 text-green-400">
    //       ✅ Connected: {account.substring(0, 6)}...{account.slice(-4)}
    //     </p>
    //   )}

    //   {/* Background Effects */}
    //   <div className="absolute w-72 h-72 bg-blue-500 opacity-10 rounded-full blur-3xl top-10 left-20"></div>
    //   <div className="absolute w-96 h-96 bg-purple-500 opacity-20 rounded-full blur-3xl bottom-10 right-20"></div>
    // </div>
  );
}
