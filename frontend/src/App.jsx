import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedLayout from "./components/ProtectedLayout";

// Pages
import Splash from "./pages/Splash";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import FindHospitals from "./pages/FindHospitals";
import HospitalList from "./pages/HospitalList";
import SymptomChecker from "./pages/SymptomChecker";
import MyReports from "./pages/MyReports";

import HospitalDetail from "./pages/HospitalDetail"; 
import OnlinePharmacy from "./pages/OnlinePharmacy";

// ⭐ Add Nearby Pharmacy Page
import NearbyPharmacy from "./pages/NearbyPharmacy";


// Auth protection
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>

        {/* Public Pages */}
        <Route path="/" element={<Splash />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />

        {/* My Reports */}
        <Route path="/my-reports" element={<PrivateRoute><MyReports /></PrivateRoute>} />

        {/* Other Protected Pages */}
        <Route path="/symptom-checker" element={<PrivateRoute><SymptomChecker /></PrivateRoute>} />
        <Route path="/find-hospitals" element={<PrivateRoute><FindHospitals /></PrivateRoute>} />
        <Route path="/hospital-list" element={<PrivateRoute><HospitalList /></PrivateRoute>} />

        {/* Dynamic Hospital Detail */}
        <Route path="/hospital/:id" element={<HospitalDetail />} />

        {/* Online Pharmacy */}
        <Route path="/online-pharmacy" element={<OnlinePharmacy />} />

        {/* ⭐ NEW: Nearby Pharmacy */}
        <Route path="/nearby-pharmacy" element={<NearbyPharmacy />} />


      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
