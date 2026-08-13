import express from "express";
import OnlinePharmacy from "../models/OnlinePharmacy.js";

const router = express.Router();

router.get("/find-best", async (req, res) => {
  const med = req.query.name?.toLowerCase();

  if (!med) return res.status(400).json({ msg: "Medicine name required" });

  const platforms = await OnlinePharmacy.find();

  let results = [];

  platforms.forEach((p) => {
    if (p.prices && p.prices[med]) {
      results.push({
        platform: p.name,
        price: p.prices[med],
        delivery: p.delivery,
        offer: p.offer,
        url: p.url,
      });
    }
  });

  if (!results.length)
    return res.json({ found: false, msg: "Medicine not available" });

  // BEST PRICE
  const best = results.reduce((a, b) => (a.price < b.price ? a : b));

  res.json({
    found: true,
    best,
    all: results,
  });
});

export default router;
