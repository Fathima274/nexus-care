// backend/routes/symptoms.js
import express from "express";
import analyzeSymptoms from "../utils/symptomLogic.js";

const router = express.Router();

router.post("/analyze", async (req, res) => {
  try {
    console.log("[symptoms] incoming body:", req.body);

    const { text, lat, lng } = req.body;

    if (!text || typeof text !== "string" || !text.trim()) {
      return res.status(400).json({ message: "Please provide a text description of symptoms" });
    }

    // Call the analysis (sync or async)
    const result = await analyzeSymptoms(text, lat, lng);

    // Validate result shape
    if (!result || !result.severity || !result.specialist) {
      console.warn("[symptoms] analyzeSymptoms returned unexpected result:", result);
      return res.status(500).json({ message: "Analysis failed" });
    }

    return res.json(result);
  } catch (err) {
    console.error("Symptom analysis error:", err && err.stack ? err.stack : err);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
