"use client";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const [account, setAccount] = useState(null);
  const [changingText, setChangingText] = useState("Secure Your Gigs");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();

  const textOptions = [
    "Secure Your Gigs",
    "Empower Your Work",
    "Safe, Transparent, Reliable",
    "Blockchain-Powered Escrow"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setChangingText(prev => {
        const index = (textOptions.indexOf(prev) + 1) % textOptions.length;
        return textOptions[index];
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

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

  function handleDropdownClick() {
    setIsDropdownOpen(!isDropdownOpen);
  }

  function handleLoginClick(path) {
    setIsDropdownOpen(false);
    router.push(path);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#004c5a] via-[#004c5a] via-35% to-[#ffffff] text-white">
      <nav className="flex justify-between items-center p-4 bg-teal-900">
        <div className="text-2xl font-bold">Gig-Escrow</div>
        <ul className="flex space-x-6">
          <li className="cursor-pointer hover:text-blue-400" onClick={() => router.push("/")}>Home</li>
          <li className="relative">
            <span className="cursor-pointer hover:text-blue-400" onClick={handleDropdownClick}>Login</span>
            {isDropdownOpen && (
              <ul className="absolute bg-gray-800 shadow-lg mt-2 rounded-lg w-48">
                <li className="block px-2 py-2 hover:bg-gray-700 text-left cursor-pointer transition" onClick={() => handleLoginClick("/pd-login")}>
                Project Distributor Login
                </li>
                <li className="block px-2 py-2 hover:bg-gray-700 text-left cursor-pointer transition" onClick={() => handleLoginClick("/freelancer-login")}>
                  Freelancer Login
                </li>
                <li className="block px-2 py-2 hover:bg-gray-700 text-left cursor-pointer transition" onClick={() => handleLoginClick("/admin-login")}>
                  Admin Login
                </li>
              </ul>
            )}
          </li>
          <li className="cursor-pointer hover:text-blue-400" onClick={() => router.push("/about-us")}>About Us</li>
          <li className="cursor-pointer hover:text-blue-400" onClick={() => router.push("/contact-us")}>Contact Us</li>
        </ul>
      </nav>

      <div className="flex flex-col lg:flex-row items-center justify-between px-10 py-20">
        <div className="text-left space-y-4 mt-[10rem]">
          <h1 className="text-5xl font-bold text-blue-400 transition-all duration-1000">{changingText}</h1>
          <p className="text-gray-400 max-w-md">
            Seamless escrow solutions for freelancers and clients—safe, transparent, and blockchain-powered.
          </p>
          {account && (
            <p className="mt-2 text-green-400">
              ✅ Connected: {account.substring(0, 6)}...{account.slice(-4)}
            </p>
          )}
        </div>

        <div className="relative bg-gradient-to-br from-[#004c5a] via-[#ffffff] via-55%">
       

        </div>
      </div>
    </div>
  );
}