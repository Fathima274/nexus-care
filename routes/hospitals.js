import express from "express";
import Hospital from "../models/Hospital.js";

const router = express.Router();

// Get all hospitals
router.get("/", async (req, res) => {
  try {
    const hospitals = await Hospital.find();
    res.json(hospitals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single hospital by its id
router.get("/:id", async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.params.id); // Find hospital by _id
    if (!hospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }
    res.json(hospital);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
