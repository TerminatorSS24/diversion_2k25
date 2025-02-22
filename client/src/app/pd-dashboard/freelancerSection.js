"use client";
import { useState, useEffect } from "react";

export default function FreelancerSelection({ account }) {
  const [freelancers, setFreelancers] = useState([]);

  useEffect(() => {
    // Fetch freelancers from backend (with SBT verification)
    setFreelancers([
      { id: 1, name: "Alice", sbtScore: 95 },
      { id: 2, name: "Bob", sbtScore: 88 },
    ]);
  }, []);

  const selectFreelancer = (freelancer) => {
    console.log("Selected freelancer:", freelancer);
    // Add smart contract interaction here
  };

  return (
    <div className="card">
      <h2 className="text-xl font-bold">Select a Freelancer</h2>
      <ul>
        {freelancers.map((freelancer) => (
          <li key={freelancer.id}>
            {freelancer.name} (SBT Score: {freelancer.sbtScore})
            <button onClick={() => selectFreelancer(freelancer)}>Select</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
