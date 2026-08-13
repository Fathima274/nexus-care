// backend/utils/symptomLogic.js
export default async function analyzeSymptoms(text, lat, lng) {
  // Defensive
  if (!text) throw new Error("No text provided");

  const t = String(text).toLowerCase();

  let severity = "Low";
  let specialist = "General Physician";
  const medicines = [];

  if (t.includes("fever") || t.includes("temperature")) {
    medicines.push("Paracetamol 500mg");
  }
  if (t.includes("cough") || t.includes("sore throat")) {
    medicines.push("Cough syrup (as needed)");
  }
  if (t.includes("headache") || t.includes("migraine")) {
    medicines.push("Dolo / Paracetamol");
  }
  if (t.includes("chest pain") || t.includes("shortness of breath") || t.includes("breathless")) {
    severity = "High";
    specialist = "Cardiologist";
  }
  if (t.includes("pregnant") || t.includes("pregnancy")) {
    specialist = "Gynecologist";
  }
  if (t.includes("skin") || t.includes("rash")) {
    specialist = "Dermatologist";
  }

  if (medicines.length === 0) {
    medicines.push("Consult a doctor — symptoms unclear");
  }

  // Static hospital list (use DB search if you have Hospital model)
  const hospitals = [
    {
      name: "City General Hospital",
      address: "123 Main Street, Downtown",
      phone: "0824-123456",
      lat: 12.9141,
      lng: 74.8560,
      distance_km: lat && lng ? 1.2 : null,
      availability: "Medium",
      specialties: ["Emergency","General","Surgery"]
    },
    {
      name: "Unity Hospital",
      address: "Highlands, Mangalore",
      phone: "0824-987654",
      lat: 12.9140,
      lng: 74.8550,
      distance_km: lat && lng ? 2.0 : null,
      availability: "Low",
      specialties: ["Emergency","General"]
    }
  ];

  return {
    severity,
    specialist,
    medicines,
    reasons: [], // optionally list matched keywords
    hospitals
  };
}
