import React, { useEffect, useState } from "react";
import "./HospitalList.css";
const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
export default function HospitalList() {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${API}/hospitals`);
        const data = await res.json();
        setHospitals(data);
      } catch (err) {
        console.error(err);
        setHospitals([]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <div className="loading">Loading hospitals…</div>;
  if (!hospitals.length) return <div className="empty">No hospitals found</div>;

  return (
    <div className="hospital-page">
      <h2 className="title">Nearby Hospitals</h2>

      <div className="hospital-container">
        {hospitals.map((h) => (
          <div className="hospital-card" key={h._id}>
            
            {/* Image */}
            <img src={h.imageUrl || "/default-image.jpg"} className="hospital-img" alt={h.name} />

            <div className="hospital-info">
              <h3 className="hospital-name">{h.name}</h3>
              <p className="hospital-location">📍 {h.address}</p>

              <p className="specialization">
                <strong>Doctors Available:</strong> {h.doctorsAvailable || 'N/A'}
              </p>

              <p className="desc">{h.description || "No description available."}</p>

              <div className="hospital-buttons">
                <a className="btn-call" href={`tel:${h.contactNumber}`}>
                  📞 Call Now
                </a>

                <a
                  className="btn-directions"
                  href={`https://www.google.com/maps/dir/?api=1&destination=${h.lat},${h.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  📍 Get Directions
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
