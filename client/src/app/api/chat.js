// pages/chat.js
"use client";
import { useState } from "react";

export default function Chat() {
  const [message, setMessage] = useState("");
  const [cidList, setCidList] = useState([]); // Store the CIDs

  const sendMessage = async () => {
    if (!message.trim()) return;

    // Upload message text to IPFS
    try {
      const res = await fetch("/api/ipfsUpload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: message })
      });
      const data = await res.json();
      if (data.cid) {
        setCidList([...cidList, data.cid]);
      }
    } catch (error) {
      console.error("Error uploading to IPFS:", error);
    }

    setMessage("");
  };

  const fetchMessageFromIPFS = async (cid) => {
    try {
      // Basic approach: fetch from a public gateway
      const response = await fetch(`https://ipfs.io/ipfs/${cid}`);
      const text = await response.text();
      return text;
    } catch (error) {
      console.error("Error fetching from IPFS:", error);
      return null;
    }
  };

  return (
    <div>
      <h2>Decentralized Chat with IPFS</h2>
      <div className="chat-box">
        {cidList.map((cid, i) => (
          <p key={i}>
            CID: {cid} —{" "}
            <button
              onClick={async () => {
                const text = await fetchMessageFromIPFS(cid);
                alert(`Fetched from IPFS: ${text}`);
              }}
            >
              View Message
            </button>
          </p>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
