import React from "react";
import "./Features.css";
import { useNavigate } from "react-router-dom";

import { 
  FiMapPin, 
  FiActivity, 
  FiUserCheck, 
  FiShoppingBag, 
  FiMap, 
  FiBarChart2 
} from "react-icons/fi";

export default function Features() {
  const navigate = useNavigate();

  const features = [
    {
      title: "Hospital Finder",
      desc: "Locate nearby hospitals instantly with accurate details.",
      icon: <FiMapPin />,
      link: "/find-hospitals"
    },
    {
      title: "AI Symptom Checker",
      desc: "Describe symptoms and get quick AI-based guidance.",
      icon: <FiActivity />,
      link: "/symptom-checker"
    },
    {
      title: "Doctor Directory",
      desc: "Find specialists and trusted healthcare professionals.",
      icon: <FiUserCheck />,
      link: "/doctors"
    },
    {
      title: "Online Pharmacy",
      desc: "Order prescribed medicines with doorstep delivery.",
      icon: <FiShoppingBag />,
      link: "/online-pharmacy"
    },
    {
      title: "Nearby Pharmacy",
      desc: "Find the closest pharmacy based on your location.",
      icon: <FiMap />,
      link: "/nearby-pharmacy"
    },
    {
      title: "Health Dashboard",
      desc: "Manage reports, BMI, and your medical history.",
      icon: <FiBarChart2 />,
      link: "/dashboard"
    }
  ];

  return (
    <section className="features fade-in">
      <h2>Comprehensive Healthcare Solutions</h2>
      <p>Your all-in-one platform for smarter healthcare access</p>

      <div className="cards">
        {features.map((item, index) => (
          <div 
            key={index} 
            className="card"
            onClick={() => navigate(item.link)}
          >
            <div className="icon-box">{item.icon}</div>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
