"use client";
import { useEffect, useState } from "react";

export default function EscrowActions({ account }) {
  const [status, setStatus] = useState(null); // Initially null to prevent hydration issues
  const [isClient, setIsClient] = useState(false); // Track client rendering

  useEffect(() => {
    setStatus("Pending"); // Set initial state only after client mounts
    setIsClient(true);
  }, []);

  const approveWork = () => {
    setStatus("Approved");
    console.log("Requesting escrow release...");
  };

  const rejectWork = () => {
    setStatus("Rejected");
    console.log("Extending deadline or refunding...");
  };

  if (!isClient) {
    return <p>Loading...</p>; // Prevents hydration issues
  } // Prevents mismatched SSR/CSR issues

  return (
    <div className="card">
      <h2 className="text-xl font-bold">Escrow Actions</h2>
      <p>
        Status:
        <span
          className={
            status === "Approved"
              ? "text-green-500"
              : status === "Rejected"
              ? "text-red-500"
              : "text-yellow-500"
          }
        >
          {status}
        </span>
      </p>
      <button onClick={approveWork} className="btn-glow bg-green-500">
        Approve & Release Funds
      </button>
      <button onClick={rejectWork} className="btn-glow bg-red-500">
        Reject & Extend/Refund
      </button>
    </div>
  );
}
