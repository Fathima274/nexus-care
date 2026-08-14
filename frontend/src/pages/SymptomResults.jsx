import React from "react";
import { useLocation } from "react-router-dom";
import { analyzeSymptoms } from "../utils/symptomLogic";
import "./SymptomResults.css";

const SymptomResults = () => {
  const location = useLocation();
  const symptoms = location.state?.symptoms || "";
  const result = analyzeSymptoms(symptoms);

  return (
    <div className="symptom-results">
      <h2>Symptom Analysis</h2>
      <p>{result.message}</p>

      <h3>Recommended Specialist</h3>
      <p className="specialist">{result.specialist}</p>

      <a href="/find-hospitals" className="btn-primary">
        🔍 View Hospitals for This Condition
      </a>
    </div>
  );
};

export default SymptomResults;
