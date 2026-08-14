import React, { useEffect, useState } from "react";
import { api } from "../services/api";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [reportsCount, setReportsCount] = useState(0);
  const [recentChecks, setRecentChecks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const r = await api.get("/reports");
        setReportsCount(r.data?.length || 0);
      } catch (err) {
        console.error("reports load error", err);
      }

      // try symptoms history (if exists on backend)
      try {
        const s = await api.get("/symptoms/history");
        setRecentChecks(s.data || []);
      } catch (e) {
        // fallback to empty - not critical
        setRecentChecks([]);
      }
    };
    load();
  }, []);

  return (
    <div className="dash-root">
      <div className="cards-row">
        <div className="card">
          <h4>BMI SCORE</h4>
          <div className="stat large">--</div>
          <div className="pill">Normal</div>
        </div>

        <div className="card">
          <h4>DETAILS</h4>
          <div className="stat">-- Yrs • --</div>
          <div className="muted">-- cm • -- kg</div>
        </div>

        <div className="card">
          <h4>LAST CHECKUP</h4>
          <div className="stat">N/A</div>
          <div className="muted">0 Total Checks</div>
        </div>
      </div>

      <div className="section">
        <h3>Recent Symptom Checks</h3>
        {recentChecks.length === 0 ? (
          <div className="empty">No symptom checks yet.</div>
        ) : (
          recentChecks.map((c) => (
            <div key={c._id} className="check-card">
              <div className="sev">{c.severity || "Medium"}</div>
              <div className="text">"{c.text}" <div className="small">Potential: {c.potential || "N/A"}</div></div>
            </div>
          ))
        )}
      </div>

      <div className="section">
        <h3>Medical Records</h3>
        <div className="records-row">
          <div>{reportsCount} records</div>
          <button className="btn primary" onClick={() => navigate("/my-reports")}>Manage Reports</button>
        </div>
      </div>
    </div>
  );
}
