export function analyzeSymptoms(symptomText) {
  if (!symptomText || symptomText.trim() === "") {
    return {
      message:
        "I couldn’t detect any symptoms. Please describe what you're feeling, even if it’s small. I’ll help you understand what it might mean.",
      specialization: null
    };
  }

  const text = symptomText.toLowerCase();
  let specialization = "General Physician";
  let message = "";

  // Default mappings
  if (text.includes("fever") || text.includes("cold") || text.includes("cough")) {
    specialization = "General Physician";
    message =
      "Your symptoms suggest a general viral or bacterial infection. Most cases are manageable with basic treatment, but monitoring is important. I recommend consulting a General Physician for a proper checkup.";
  } 
  else if (text.includes("chest pain") || text.includes("breath") || text.includes("heart")) {
    specialization = "Cardiologist";
    message =
      "Chest-related symptoms can sometimes indicate heart strain or circulatory issues. It’s important not to ignore these. A Cardiologist would be the right specialist to assess this properly.";
  } 
  else if (text.includes("stomach") || text.includes("vomit") || text.includes("abdomen")) {
    specialization = "Gastroenterologist";
    message =
      "These symptoms point toward digestive or abdominal issues. They can range from mild infections to more serious conditions. A Gastroenterologist will help diagnose it correctly.";
  } 
  else if (text.includes("headache") || text.includes("dizzy") || text.includes("migraine")) {
    specialization = "Neurologist";
    message =
      "These symptoms are often linked to neurological conditions like migraines, nerve sensitivity, or stress. A Neurologist can perform a deeper evaluation to identify the cause.";
  } 
  else if (text.includes("fracture") || text.includes("leg pain") || text.includes("bone")) {
    specialization = "Orthopedic";
    message =
      "This seems related to your bones or muscles. Injuries like strains or fractures need professional examination. An Orthopedic specialist will be the best option.";
  } 
  else {
    specialization = "General Physician";
    message =
      "Your symptoms could be linked to multiple categories, so an initial evaluation from a General Physician is safest. They can guide you to a specialist if needed.";
  }

  return { message, specialization };
}
