"use client";
import { useState, useEffect } from "react";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch existing messages on load
    async function fetchMessages() {
      const res = await fetch("../api/chat.js");
      const data = await res.json();
      setMessages(data.messages);
    }
    fetchMessages();
  }, []);

  const sendMessage = async () => {
    if (message.trim() === "") return;
    // Add new message locally
    setMessages([...messages, { sender: "You", text: message }]);

    // Send to API
    await fetch("../api/chat.js", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: message, sender: "You" }),
    });
    setMessage("");
  };

  return (
    <div className="card">
      <h2 className="text-xl font-bold">Chat</h2>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <p key={index}>
            <strong>{msg.sender}:</strong> {msg.text}
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
