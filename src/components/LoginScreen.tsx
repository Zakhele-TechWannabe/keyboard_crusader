import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import "@/styles/login.css";
import { message } from "antd";

const LoginScreen: React.FC = () => {
  const [username, setUsername] = useState("");
  const router = useRouter();

  useEffect(() => {
    const closeFullscreen = () => {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    };
    // Open full screen when the component mounts
    closeFullscreen();

}, []); 

  const handleLogin = async () => {
    if (!username) {
      alert("Please enter a username");
      return;
    }
    debugger;
    const response = await fetch("https://keyboard-crusader-backend.onrender.com/api/addUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("user", data.id);
      message.success("user successfully logged in.")
      
      setTimeout(() => {
        router.push('/desktop');
      }, 300);
    
     
    } else {
      alert("Failed to register user");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img src="/images/gameLogo.png" alt="Game Logo" className="login-logo" />
        <h1 className="login-title">Welcome to<br></br>Keyboard Crusaders</h1>
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="login-input"
        />
        <button onClick={handleLogin} className="login-button">
          Start Game
        </button>
      </div>
    </div>
  );
};

export default LoginScreen;
