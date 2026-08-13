import express from "express";
import Doctor from "../models/Doctor.js";

const router = express.Router();

// Get all doctors
router.get("/", async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Add doctor (for testing)
router.post("/", async (req, res) => {
  try {
    const doctor = new Doctor(req.body);
    await doctor.save();
    res.json(doctor);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding doctor");
  }
});

export default router;
