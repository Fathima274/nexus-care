import React, { useEffect, useState } from "react";
import { api } from "../services/api";
import "./MyReports.css";

export default function MyReports() {
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState("");
  const [reports, setReports] = useState([]);

  // Load reports from backend
  const load = async () => {
    try {
      const res = await api.get("/reports");
      setReports(res.data);
    } catch (err) {
      console.error("❌ Failed to load reports:", err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  // Upload file
  const upload = async () => {
    if (!file) return alert("Please choose a file!");

    const form = new FormData();
    form.append("file", file);
    form.append("description", desc);

    try {
      await api.post("/reports/upload", form);
      setFile(null);
      setDesc("");
      load();
    } catch (err) {
      console.error("❌ Upload failed:", err);
    }
  };

  // Build absolute working URL
 const formatUrl = (url) => {
  if (!url) return "#";

  // remove leading slash to avoid double "//uploads"
  const clean = url.startsWith("/") ? url.slice(1) : url;

  return `http://localhost:5000/${clean}`;
};

  return (
    <div className="reports-wrapper">
      <div className="reports-header">
        <h1>Medical Records</h1>
        <p>Securely store your prescriptions and lab reports.</p>

        <button
          className="upload-new-btn"
          onClick={() => document.getElementById("fileInput").click()}
        >
          + Upload New
        </button>
      </div>

      {/* Hidden file input */}
      <input
        id="fileInput"
        type="file"
        style={{ display: "none" }}
        onChange={(e) => setFile(e.target.files[0])}
      />

      {/* Upload box */}
      {file && (
        <div className="upload-box">
          <p className="upload-title">Add Description</p>

          <input
            className="desc-input"
            placeholder="Short description (e.g., Blood Test Report)"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />

          <button className="upload-btn" onClick={upload}>
            Upload
          </button>
        </div>
      )}

      {/* Empty state */}
      {reports.length === 0 && (
        <div className="empty-box">
          <div className="empty-icon">⬆️</div>
          <p className="empty-title">No records found</p>
          <p className="empty-sub">Upload photos of prescriptions or PDF reports.</p>
        </div>
      )}

      {/* Reports grid */}
      <div className="reports-grid">
        {reports.map((r) => {
          const viewUrl = formatUrl(r.url);

          // 🔍 Debug logs (SO WE CAN SEE THE REAL URL)
          console.log("🔎 Raw URL from DB:", r.url);
          console.log("🔗 Final full URL:", viewUrl);

          return (
            <div className="report-card" key={r._id}>
              <div className="report-thumb">
                {r.fileType === "pdf" ? (
                  <span className="pdf-icon">PDF</span>
                ) : (
                  <img src={viewUrl} alt="report" />
                )}
              </div>

              <div className="report-info">
                <h4>{r.description}</h4>
                <p className="report-date">{new Date(r.createdAt).toLocaleString()}</p>

                {/* OPEN IN NEW TAB — WORKS 100% */}
                <a href={viewUrl} target="_blank" rel="noopener noreferrer" className="view-btn">
                  View
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
