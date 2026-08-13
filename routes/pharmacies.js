import express from "express";
import Pharmacy from "../models/Pharmacy.js";

const router = express.Router();

// GET all pharmacies (offline)
router.get("/", async (req, res) => {
  try {
    const pharmacies = await Pharmacy.find();
    res.json(pharmacies);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
