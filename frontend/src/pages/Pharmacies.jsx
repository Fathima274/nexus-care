import React, { useState } from "react";
import { api } from "../services/api"; // Assuming this is already set up for API calls
import "./Pharmacies.css"; // Add styling here

export default function Pharmacies() {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle search input change
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle form submit and fetch data
  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (!searchQuery) return;

    setLoading(true);
    try {
      const res = await api.get(`/pharmacies/search?query=${searchQuery}`);
      setResults(res.data);
    } catch (error) {
      console.error("Error fetching results:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pharmacies-container">
      <h1>Medicine & Pharmacy</h1>
      <p>Find local stores or order online for home delivery.</p>

      {/* Search bar */}
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Search for medicine..."
          value={searchQuery}
          onChange={handleSearch}
        />
        <button type="submit">Search</button>
      </form>

      {/* Loading Spinner */}
      {loading && <p>Loading...</p>}

      {/* Display results */}
      {results && (
        <div className="pharmacy-results">
          {results.tata1mg && (
            <div className="pharmacy">
              <h3>{results.tata1mg.name}</h3>
              <p>Price: {results.tata1mg.price}</p>
              <p>Delivery Time: {results.tata1mg.deliveryTime}</p>
              <a href={results.tata1mg.url} target="_blank" rel="noreferrer">
                Order Now
              </a>
            </div>
          )}
          {/* Repeat similar blocks for other pharmacies */}
        </div>
      )}
    </div>
  );
}
