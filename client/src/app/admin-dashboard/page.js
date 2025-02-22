"use client";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useRouter } from "next/navigation";
import styles from "./admin-dashboard.module.css";

export default function AdminDashboard() {
  const router = useRouter();
  const [account, setAccount] = useState(null);
  const [disputes, setDisputes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkWallet = async () => {
      if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_accounts", []);
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        } else {
          router.push("/admin-login");
        }
      } else {
        alert("MetaMask is required.");
        router.push("/admin-login");
      }
    };
    checkWallet();
  }, [router]);

  const verifyDispute = async (disputeId) => {
    setLoading(true);
    try {
      // Call smart contract function to resolve the dispute
      console.log("Verifying dispute:", disputeId);
      // Placeholder: Call dispute resolution contract
    } catch (error) {
      console.error("Error verifying dispute:", error);
    }
    setLoading(false);
  };

  const releaseFunds = async (disputeId) => {
    setLoading(true);
    try {
      // Call multi-sig wallet smart contract
      console.log("Releasing funds for dispute:", disputeId);
      // Placeholder: Call multi-signature contract function
    } catch (error) {
      console.error("Error releasing funds:", error);
    }
    setLoading(false);
  };

  const issueSBT = async (freelancerAddress) => {
    setLoading(true);
    try {
      // Call smart contract function to issue SBT
      console.log("Issuing SBT to:", freelancerAddress);
      // Placeholder: Issue SBT transaction
    } catch (error) {
      console.error("Error issuing SBT:", error);
    }
    setLoading(false);
  };

  return (
    <div className={styles.dashboard}>
      <h1 className={styles.heading}>Admin Dashboard</h1>
      <p className={styles.account}>Logged in as: {account}</p>

      <div className={styles.section}>
        <h2>Pending Disputes</h2>
        {disputes.length > 0 ? (
          disputes.map((dispute, index) => (
            <div key={index} className={styles.disputeCard}>
              <p><strong>Dispute ID:</strong> {dispute.id}</p>
              <p><strong>Freelancer:</strong> {dispute.freelancer}</p>
              <p><strong>Project Distributor:</strong> {dispute.distributor}</p>
              <button onClick={() => verifyDispute(dispute.id)} className={styles.button}>
                Verify Dispute
              </button>
              <button onClick={() => releaseFunds(dispute.id)} className={styles.button}>
                Release Funds
              </button>
              <button onClick={() => issueSBT(dispute.freelancer)} className={styles.button}>
                Issue SBT
              </button>
            </div>
          ))
        ) : (
          <p>No disputes found.</p>
        )}
      </div>
    </div>
  );
}
