"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ethers } from "ethers";
import PostProject from "./postproject";
import FreelancerSelection from "./freelancerSection";
import Chat from "./chat";
import EscrowActions from "./escrowActions";

export default function PDDashboard() {
  const [account, setAccount] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const checkWallet = async () => {
      if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_accounts", []);
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        } else {
          router.push("/pd-login");
        }
      } else {
        alert("MetaMask is not installed.");
        router.push("/pd-login");
      }
    };
    checkWallet();
  }, [router]);

  return (
    <div className="dashboard-container">
      <h1 className="text-3xl font-bold text-white">Project Distributor Dashboard</h1>
      <p className="text-green-400">Connected: {account}</p>

      {/* Post a Project */}
      <PostProject account={account} />

      {/* Freelancer Selection */}
      <FreelancerSelection account={account} />

      {/* Chat System */}
      <Chat account={account} />

      {/* Escrow Actions */}
      <EscrowActions account={account} />
    </div>
  );
}
