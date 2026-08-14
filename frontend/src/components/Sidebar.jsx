import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">NexusCare<span className="plus">+</span></div>

      <nav className="side-nav">

        <NavLink 
          to="/dashboard" 
          className={({isActive}) => isActive ? "nav-item active" : "nav-item"}
        >
          Dashboard
        </NavLink>

        <NavLink 
          to="/symptom-checker" 
          className={({isActive}) => isActive ? "nav-item active" : "nav-item"}
        >
          Symptom Checker
        </NavLink>

        <NavLink 
          to="/find-hospitals" 
          className={({isActive}) => isActive ? "nav-item active" : "nav-item"}
        >
          Find Hospitals
        </NavLink>

        {/* ⭐ Online Pharmacy */}
        <NavLink 
          to="/online-pharmacy" 
          className={({isActive}) => isActive ? "nav-item active" : "nav-item"}
        >
          Online Pharmacy
        </NavLink>

        {/* ⭐ Nearby (Offline) Pharmacy */}
        <NavLink 
          to="/nearby-pharmacy" 
          className={({isActive}) => isActive ? "nav-item active" : "nav-item"}
        >
          Nearby Pharmacy
        </NavLink>

        <NavLink 
          to="/my-reports" 
          className={({isActive}) => isActive ? "nav-item active" : "nav-item"}
        >
          My Reports
        </NavLink>

        <a className="nav-item sos" href="tel:102">Emergency SOS</a>
      </nav>

      <div className="side-footer">© NexusCare+</div>
    </aside>
  );
}
