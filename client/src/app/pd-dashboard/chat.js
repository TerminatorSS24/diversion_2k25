"use client";
import { useState } from "react";

export default function Chat({ account }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    if (message.trim() === "") return;
    setMessages([...messages, { sender: "You", text: message }]);
    setMessage("");
  };

  return (
    <div className="card">
      <h2 className="text-xl font-bold">Chat</h2>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <p key={index}><strong>{msg.sender}:</strong> {msg.text}</p>
        ))}
      </div>
      <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type a message..." />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
