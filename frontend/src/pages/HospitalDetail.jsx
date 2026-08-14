import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./HospitalDetail.css";
const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function HospitalDetail() {
  const { id } = useParams();
  const [hospital, setHospital] = useState(null);

  useEffect(() => {
    async function load() {
      const res = await fetch(`${API}/hospitals/${id}`);
      const data = await res.json();
      setHospital(data);
    }
    load();
  }, [id]);

  if (!hospital) return <p className="loading">Loading hospital details...</p>;

  return (
    <div className="detail-wrapper">

      <div className="hospital-detail-card">
        <h1 className="hospital-title">{hospital.name}</h1>

        <p><strong>📍 Location:</strong> {hospital.address}</p>
        <p><strong>👨‍⚕️ Doctors Available:</strong> {hospital.doctorsAvailable}</p>
        <p><strong>Total Beds:</strong> {hospital.totalBeds}</p>
        <p><strong>Available Beds:</strong> {hospital.availableBeds}</p>

        <p><strong>Specializations:</strong> 
          {hospital.specializations?.join(", ") || "Not available"}
        </p>

        <p><strong>Description:</strong> {hospital.description || "No details available."}</p>

        <div className="button-row">
          <a className="btn-call" href={`tel:${hospital.contactNumber}`}>
            📞 Call Now
          </a>

          <a
            className="btn-directions"
            href={`https://www.google.com/maps/search/?q=${encodeURIComponent(
  hospital.address
)}`}
            target="_blank"
rel="noopener noreferrer"
          >
            📍 Get Directions
          </a>
        </div>
      </div>

    </div>
  );
}
