import React, { useEffect, useState } from "react";
import "@/styles/leaderboard.css";
import { HomeOutlined, TrophyOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import BackButton from "./backButton";

const Leaderboard: React.FC = () => {
  const [leaderboardData, setLeaderboardData] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const response = await fetch("https://keyboard-crusader-backend.onrender.com/api/getLeaderboard");
        const data = await response.json();
        console.log("Leaderboard data", data);
        setLeaderboardData(data);
      } catch (error) {
        console.error("Failed to fetch leaderboard data", error);
      }
    };

    fetchLeaderboardData();
  }, []);

  const topThree = leaderboardData.slice(0, 3);
  const remainingPlayers = leaderboardData.slice(3);

  return (
    <>
    <div style={{padding: '20px'}}>
        <BackButton/>
      </div>
    <div className="leaderboard-container">
      <header className="leaderboard-header">
        <img
          src="/images/devOpsLogo.png"
          alt="Azure DevOps Logo"
          className="azure-logo"
        />
        <h1>Leaderboard</h1>
        <button
          className="home-button"
          onClick={() => router.push("/desktop")}
        >
          <HomeOutlined />
          Home
        </button>
      </header>

      <div className="leaderboard-content">
        <div className="top-players-section">
          {topThree.map((user, index) => (
            <div key={index} className={`top-player top-player-${index + 1}`}>
              <img src={`/images/avatars/avatar${user.user_id}.png`} alt="Avatar" className="top-player-avatar" />
              <h2>{user.username}</h2>
              <p>Level: {user.level_number}</p>
              <p>Score: {user.total_score}</p>
              <TrophyOutlined className="trophy-icon" />
            </div>
          ))}
        </div>

        <div className="leaderboard-table-container">
          <table className="leaderboard-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Username</th>
                <th>Level</th>
                <th>Score</th>
                <th>Attempts</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardData.length > 0 ? (
                leaderboardData.map((user, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <img src={`/images/avatars/avatar${user.user_id}.png`} alt="Avatar" className="avatar" />
                      {user.username}
                    </td>
                    <td>{user.level_number}</td>
                    <td>{user.total_score}</td>
                    <td>{user.attempts_count}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="no-data">
                    No leaderboard data available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </>
  );
};

export default Leaderboard;
