import React, { useEffect, useState } from "react";
import "./OnlinePharmacy.css";

const API =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function OnlinePharmacy() {
  const [platforms, setPlatforms] = useState([]);
  const [search, setSearch] = useState("");
  const [best, setBest] = useState(null);

  useEffect(() => {
    loadPlatforms();
  }, []);

  async function loadPlatforms() {
    try {
      const res = await fetch(`${API}/online-pharmacy`);
      const data = await res.json();
      setPlatforms(data);
    } catch (err) {
      console.error("Failed to load pharmacy platforms:", err);
    }
  }

  async function handleSearch() {
    if (!search.trim()) return;

    try {
      const res = await fetch(
        `${API}/online-pharmacy/search?medicine=${encodeURIComponent(search)}`
      );

      const data = await res.json();
      console.log("AI RESULT:", data);

      setBest(data.best);
    } catch (err) {
      console.error("Search error:", err);
    }
  }

  return (
    <div className="online-wrapper">
      <h1 className="title">AI Medicine Finder</h1>

      <p className="subtitle">
        Search medicines. AI finds lowest cost & fastest delivery.
      </p>

      {/* Search Bar */}
      <div className="search-section">
        <input
          className="search-box"
          placeholder="Search medicine..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          className="search-btn"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      {/* AI BEST PICK */}
      {best && (
        <div className="best-card">
          <h2>🔥 Best Recommendation</h2>

          <p>
            <strong>Medicine:</strong> {best.medicine}
          </p>

          <p>
            <strong>Platform:</strong> {best.platform}
          </p>

          <p>
            <strong>Rating:</strong> ⭐ {best.rating}
          </p>

          {best.offer && (
            <p>
              <strong>Offer:</strong> {best.offer}
            </p>
          )}

          {best.delivery && (
            <p>
              <strong>Delivery:</strong> {best.delivery}
            </p>
          )}

          <a
            href={best.url}
            target="_blank"
            rel="noopener noreferrer"
            className="visit-btn"
          >
            Visit Platform
          </a>
        </div>
      )}

      <h2>All Options</h2>

      {/* All Platforms */}
      <div className="platform-grid">
        {platforms.map((p) => (
          <div
            className="platform-card"
            key={p._id}
          >
            <h2>{p.name}</h2>

            <p>⭐ Rating: {p.rating}</p>

            <p>💰 Offer: {p.offer}</p>

            <p>
              ⏱ Delivery:{" "}
              {p.delivery || "Not Mentioned"}
            </p>

            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="visit-btn"
            >
              Visit Platform
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}