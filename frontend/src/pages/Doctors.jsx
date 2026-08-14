import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Doctors.css";
import { FiPhone, FiSearch } from "react-icons/fi";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
    try {
      const res = await axios.get(`${API}/doctors`);
      setDoctors(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = doctors.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.specialization.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="doctors-page">
      <h1>Find a Doctor</h1>
      <p>Browse trusted specialists across all medical fields</p>

      <div className="doc-search-box">
        <FiSearch size={20} />
        <input
          placeholder="Search by name or specialization..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div className="doctor-grid">
        {filtered.map((d, i) => (
          <div key={i} className="doctor-card">
            <h3>{d.name}</h3>
            <p className="spec">{d.specialization}</p>
            <p className="hospital">{d.hospital}</p>

            <a href={`tel:${d.phone}`} className="call-btn">
              <FiPhone size={18} /> Call
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
