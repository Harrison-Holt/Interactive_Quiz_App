import { useEffect, useState } from "react";

export default function GameUpdates() {
  const [gameData, setGameData] = useState("Waiting for updates...");

  useEffect(() => {
    const fetchGameUpdates = async () => {
      try {
        const response = await fetch("https://TriviaGame-NLB-2ecf0d666da3596e.elb.us-east-1.amazonaws.com/game-updates");
        const data = await response.json();
        setGameData(data.message);
        console.log("📩 Game update received:", data);

        // Reconnect immediately after receiving data
        fetchGameUpdates();
      } catch (error) {
        console.error("❌ Error fetching updates:", error);
      }
    };

    fetchGameUpdates();
  }, []);

  return (
    <div>
      <h2>Game Updates</h2>
      <p>{gameData}</p>
    </div>
  );
}

