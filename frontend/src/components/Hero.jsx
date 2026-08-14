import React from "react";
import "./Hero.css";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="hero">
      <h4 className="tag">💡 AI-Powered Healthcare Platform</h4>

      <h1>Your Health, Our Priority</h1>

      <p>
        Get instant access to hospitals, AI health insights, expert doctors,
        and emergency care — all in one intelligent platform.
      </p>

      <div className="hero-buttons">
        <button className="btn-primary" onClick={() => navigate("/symptom-checker")}>
          🤖 Try AI Symptom Checker
        </button>

        <button className="btn-secondary" onClick={() => navigate("/find-hospitals")}>
          📍 Find Hospitals
        </button>
      </div>
    </section>
  );
}
