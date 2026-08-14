import React from "react";
import { useNavigate } from "react-router-dom";
import "./Splash.css";

export default function Splash() {
  const navigate = useNavigate();

  return (
    <div className="splash-container">
      <h1 className="splash-title">NexusCare+</h1>
      <p className="splash-subtitle">Your Smart Healthcare Assistant</p>

      <button className="splash-btn" onClick={() => navigate("/login")}>
        Get Started
      </button>
    </div>
  );
}
