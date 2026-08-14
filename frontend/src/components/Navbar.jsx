import React from "react";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";
import { FiPhoneCall } from "react-icons/fi";

export default function Navbar() {
  const token = localStorage.getItem("nc_token");
  const navigate = useNavigate();
  const location = useLocation();

  // Pages where navbar should NOT appear
  const hideNavbarPages = ["/", "/login", "/register"];

  if (hideNavbarPages.includes(location.pathname)) {
    return null; // Hide navbar on splash, login, register
  }

  const handleLogout = () => {
    localStorage.removeItem("nc_token");
    localStorage.removeItem("nc_user");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      {/* LOGO */}
      <Link to="/home" className="navbar-logo">
        <span className="logo-text">
          NexusCare<span className="logo-plus">+</span>
        </span>
      </Link>

      {/* NAVIGATION LINKS */}
      <div className="nav-links">

        {/* Visible only when logged in */}
        {token && (
          <>
            <NavLink to="/home">Home</NavLink>
            <NavLink to="/find-hospitals">Find Hospitals</NavLink>
            <NavLink to="/symptom-checker">Symptom Checker</NavLink>
            <NavLink to="/dashboard">Dashboard</NavLink>
          </>
        )}
      </div>

      {/* SOS Button */}
      <button className="sos-button">
        <FiPhoneCall size={18} />
        SOS Emergency
      </button>

      {/* Logout button */}
      {token && (
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      )}
    </nav>
  );
}
