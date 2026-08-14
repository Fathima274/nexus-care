import React, { useState } from "react";
import { api } from "../services/api";
import "./SymptomChecker.css";
import { FiAlertCircle } from "react-icons/fi";

export default function SymptomChecker() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  const analyzeSymptoms = async () => {
    setErr(null);
    setLoading(true);
    setResult(null);

    const getLocation = () =>
      new Promise((resolve) => {
        if (!navigator.geolocation) return resolve({});
        navigator.geolocation.getCurrentPosition(
          (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
          () => resolve({})
        );
      });

    try {
      const location = await getLocation();
      const payload = { text, ...location };

      const res = await api.post("/symptoms/analyze", payload);
      setResult(res.data);
    } catch (error) {
      setErr(error.response?.data?.message || "Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="symp-container fade-in">
      <h1>AI Symptom Checker</h1>
      <p className="sub">
        Describe what you're feeling — like “fever for 2 days, headache and cough”
      </p>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Describe your symptoms..."
      />

      <button className="analyze-btn" onClick={analyzeSymptoms} disabled={!text || loading}>
        {loading ? "Analyzing..." : "Analyze"}
      </button>

      {err && <div className="error">{err}</div>}

      {/* ------------------ RESULT BOX ------------------ */}
      {result && (
        <div className="result-box">

          {/* Severity */}
          <div className={`severity ${result.severity.toLowerCase()}`}>
            <FiAlertCircle />
            <span>{result.severity} Severity</span>
          </div>

          {/* Specialist */}
          <div className="section">
            <h3>Recommended Specialist</h3>
            <p className="specialist">{result.specialist}</p>
          </div>

          {/* Medicines */}
          {result.medicines.length > 0 && (
            <div className="section">
              <h3>Suggested Medicines</h3>
              <ul>
                {result.medicines.map((m, i) => (
                  <li key={i}>{m}</li>
                ))}
              </ul>
            </div>
          )}

          {/* ------------------ HOSPITALS ------------------ */}
          <div className="section">
            <h3>Nearest Hospitals</h3>

            <div className="hospital-grid">
              {result.hospitals.map((h, i) => (
                <div key={i} className="hospital-card-new">

                  {/* title + emergency badge */}
                  <div className="header-row">
                    <h3>{h.name}</h3>
                    <span className="badge-emergency">24/7 Emergency</span>
                  </div>

                  {/* address + distance */}
                  <p className="address">📍 {h.address}</p>
                  <p className="distance">
                    📡 {h.distance_km ? h.distance_km.toFixed(1) : "?"} km away
                  </p>

                  {/* availability */}
                  <span className={`availability ${(h.availability || "Medium").toLowerCase()}`}>
                    {h.availability || "Medium Availability"}
                  </span>

                  {/* specialties */}
                  <p className="specs">
                    <strong>Specialties:</strong>{" "}
                    {h.specialties || "General, Emergency, Surgery"}
                  </p>

                  {/* call + directions buttons */}
                  <div className="actions">
                    {h.phone && (
                      <a href={`tel:${h.phone}`} className="call-btn-new">
                        📞 Call Now
                      </a>
                    )}

                    {h.lat && h.lng && (
                      <a
                        className="dir-btn-new"
                        target="_blank"
                        href={`https://www.google.com/maps/dir/?api=1&destination=${h.lat},${h.lng}`}
                      >
                        🧭 Get Directions
                      </a>
                    )}
                  </div>

                </div>
              ))}
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
