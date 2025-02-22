"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ethers } from "ethers";
import Link from "next/link";
import { FaFileUpload, FaExclamationTriangle, FaClock } from "react-icons/fa";

export default function FreelancerDashboard() {
  const [account, setAccount] = useState(null);
  const [projects, setProjects] = useState([]);
  const [hiredProject, setHiredProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Simulate fetching available projects from blockchain
    setTimeout(() => {
      setProjects([
        { id: 1, title: "Website Development", budget: "0.5 ETH" },
        { id: 2, title: "Smart Contract Audit", budget: "1.2 ETH" },
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const applyForProject = (projectId) => {
    alert(`Applied for project ID: ${projectId}`);
  };

  const submitWork = () => {
    alert("Work submitted for review!");
  };

  const requestExtension = () => {
    alert("Deadline extension requested.");
  };

  const escalateToAdmin = () => {
    alert("Admin notified about issue.");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-4">Freelancer Dashboard</h1>
      
      {/* Available Projects */}
      {isLoading ? (
        <p>Loading projects...</p>
      ) : (
        <div className="w-full max-w-3xl bg-gray-800 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Available Projects</h2>
          {projects.map((project) => (
            <div key={project.id} className="flex justify-between items-center bg-gray-700 p-3 mb-2 rounded">
              <span>{project.title} - <strong>{project.budget}</strong></span>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded"
                onClick={() => applyForProject(project.id)}
              >
                Apply
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Hired Project */}
      {hiredProject && (
        <div className="w-full max-w-3xl bg-gray-800 p-4 rounded-lg shadow-md mt-6">
          <h2 className="text-xl font-semibold mb-2">Ongoing Project</h2>
          <p className="mb-2">{hiredProject.title} - <strong>{hiredProject.budget}</strong></p>
          <p className="text-sm text-gray-300">Files are stored on <a href={hiredProject.ipfsLink} className="text-blue-400 underline" target="_blank">IPFS</a></p>
          <div className="mt-4 flex gap-2">
            <button className="bg-green-500 hover:bg-green-700 text-white px-3 py-1 rounded flex items-center gap-1" onClick={submitWork}>
              <FaFileUpload /> Submit Work
            </button>
            <button className="bg-yellow-500 hover:bg-yellow-700 text-white px-3 py-1 rounded flex items-center gap-1" onClick={requestExtension}>
              <FaClock /> Request Extension
            </button>
            <button className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded flex items-center gap-1" onClick={escalateToAdmin}>
              <FaExclamationTriangle /> Escalate to Admin
            </button>
          </div>
        </div>
      )}
    </div>
  );
}