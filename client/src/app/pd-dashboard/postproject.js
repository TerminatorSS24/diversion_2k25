"use client";
import { useState } from "react";

export default function PostProject({ account }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [payment, setPayment] = useState("");
  const [deadline, setDeadline] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Project posted:", { title, description, payment, deadline });

    // Add smart contract interaction here
  };

  return (
    <div className="card">
      <h2 className="text-xl font-bold">Post a New Project</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Project Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <input type="number" placeholder="Payment (ETH)" value={payment} onChange={(e) => setPayment(e.target.value)} required />
        <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
