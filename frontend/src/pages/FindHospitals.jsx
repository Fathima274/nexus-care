import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./FindHospitals.css";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function FindHospitals() {
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${API}/hospitals`);
        const data = await res.json();
        setHospitals(data);
      } catch (err) {
        console.error(err);
      }
    }
    load();
  }, []);

  return (
    <div className="find-hospitals-page">

      <h1 className="page-title">Find Hospitals</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by hospital name, area or specialization..."
        className="search-box"
      />

      <div className="hospital-grid">
        {hospitals.map((h) => (
          <div className="hospital-card" key={h._id}>
            
            <h2 className="hospital-name">{h.name}</h2>
            <p className="hospital-location">{h.address}</p>

            <p className="hospital-meta">
              <span>🚑 Beds: {h.totalBeds || "N/A"} / {h.availableBeds || "N/A"}</span>
              <span>👨‍⚕️ Doctors: {h.doctorsAvailable || "N/A"}</span>
            </p>

            <div className={`availability-badge ${h.availability || "medium"}`}>
              {h.availability || "Medium"}
            </div>

            <p className="specialties">
              <strong>Specialties:</strong> {h.specializations?.join(", ") || "Not available"}
            </p>

            <div className="hospital-actions">
              <a
                className="btn-directions"
                href={`https://www.google.com/maps/search/?q=${h.address}`}
                target="_blank"
              >
                📍 Get Directions
              </a>

              <Link to={`/hospital/${h._id}`} className="btn-details">
                Details
              </Link>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
