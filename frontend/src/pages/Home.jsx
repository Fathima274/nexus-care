import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const nav = useNavigate();

  return (
    <div className="home-container">

      <h1 className="home-title">Comprehensive Healthcare Solutions</h1>
      <p className="home-subtitle">Your all-in-one platform for smarter healthcare access</p>

      <div className="home-grid">

        {/* Hospital Finder */}
        <div className="home-card" onClick={() => nav("/find-hospitals")}>
          <div className="icon">📍</div>
          <h3>Hospital Finder</h3>
          <p>Locate nearby hospitals instantly with accurate details.</p>
        </div>

        {/* AI Symptom Checker */}
        <div className="home-card" onClick={() => nav("/symptom-checker")}>
          <div className="icon">💡</div>
          <h3>AI Symptom Checker</h3>
          <p>Describe symptoms and get quick AI-based guidance.</p>
        </div>

        {/* Doctor Directory */}
        <div className="home-card" onClick={() => nav("/find-hospitals")}>
          <div className="icon">👤</div>
          <h3>Doctor Directory</h3>
          <p>Find specialists and trusted healthcare professionals.</p>
        </div>

        {/* Online Pharmacy */}
        <div className="home-card" onClick={() => nav("/online-pharmacy")}>
          <div className="icon">🛒</div>
          <h3>Online Pharmacy</h3>
          <p>Order prescribed medicines with doorstep delivery.</p>
        </div>

        {/* Nearby Pharmacy */}
        <div className="home-card" onClick={() => nav("/pharmacies")}>
          <div className="icon">🗺️</div>
          <h3>Nearby Pharmacy</h3>
          <p>Find the closest pharmacy based on your location.</p>
        </div>

        {/* Health Dashboard */}
        <div className="home-card" onClick={() => nav("/dashboard")}>
          <div className="icon">📊</div>
          <h3>Health Dashboard</h3>
          <p>Manage reports, BMI, and your medical history.</p>
        </div>
      </div>

    </div>
  );
}
