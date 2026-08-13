import express from "express";
import OnlinePharmacy from "../models/OnlinePharmacy.js";

const router = express.Router();

// ------------ GET ALL PLATFORMS -------------
router.get("/", async (req, res) => {
  const platforms = await OnlinePharmacy.find();
  res.json(platforms);
});

// ------------ AI MEDICINE SEARCH (Price-Based) -------------
router.get("/search", async (req, res) => {
  const medicine = req.query.medicine?.toLowerCase();

  if (!medicine) {
    return res.json({ best: null });
  }

  const platforms = await OnlinePharmacy.find();

  // 🧠 Smart AI logic → choose LOWEST PRICE platform
  const best = platforms.sort((a, b) => a.price - b.price)[0];

  return res.json({
    best: {
      medicine,
      platform: best.name,
      price: best.price,
      rating: best.rating,
      offer: best.offer,
      delivery: best.delivery,
      url: best.url
    }
  });
});

export default router;
