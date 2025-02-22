import { useEffect, useState } from "react";

export default function WebSocketComponent() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const socket = new WebSocket("ws://44.197.176.247:8080");

    socket.onopen = () => console.log("✅ WebSocket Connected!");

    socket.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data]);
    };

    socket.onerror = (error) => console.error("❌ WebSocket Error:", error);
    socket.onclose = () => console.log("🔌 WebSocket Disconnected!");

    return () => socket.close();
  }, []);

  return (
    <div>
      <h2>WebSocket Messages</h2>
      {messages.map((msg, index) => (
        <p key={index}>{msg}</p>
      ))}
    </div>
  );
}
