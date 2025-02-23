"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ethers } from "ethers";
import Link from "next/link";
import { FaFileUpload, FaExclamationTriangle, FaClock } from "react-icons/fa";

export default function FreelancerDashboard() {
  const [account, setAccount] = useState(null);
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProjects = async () => {
      // Simulate fetching job details from blockchain
      setTimeout(() => {
        setProjects([
          {
            id: 1,
            title: "Website Development",
            techStack: "Next.js, Tailwind CSS, Solidity",
            price: "0.5 ETH",
            duration: "2 weeks",
          },
          {
            id: 2,
            title: "Smart Contract Audit",
            techStack: "Solidity, Hardhat, OpenZeppelin",
            price: "1.2 ETH",
            duration: "3 weeks",
          },
        ]);
        setIsLoading(false);
      }, 1000);
    };
    fetchProjects();
  }, []);

  const applyForProject = (projectId) => {
    alert(`Applied for project ID: ${projectId}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
      <h1 className="text-4xl font-extrabold mb-8 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">Freelancer Dashboard</h1>
      
      {isLoading ? (
        <p className="text-xl text-gray-400 animate-pulse">Loading projects...</p>
      ) : (
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700 transform hover:scale-105 transition-all duration-300">
              <h2 className="text-2xl font-semibold text-green-400">{project.title}</h2>
              <p className="text-gray-300 mt-2">Tech Stack: <span className="text-white">{project.techStack}</span></p>
              <p className="text-gray-300 mt-1">Price: <span className="text-yellow-400">{project.price}</span></p>
              <p className="text-gray-300 mt-1">Duration: <span className="text-red-400">{project.duration}</span></p>
              <button
                className="mt-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-indigo-600 hover:to-blue-500 text-white font-semibold px-6 py-2 rounded-lg w-full transition-all shadow-lg hover:shadow-xl"
                onClick={() => applyForProject(project.id)}
              >
                Apply Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
