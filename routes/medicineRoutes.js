import express from "express";
const router = express.Router();

// Dummy database for AI medicine search
// Later you can store this in MongoDB if you want
const medicineData = {
  paracetamol: [
    { name: "Tata 1mg", price: 22, delivery: "Fast Delivery", url: "https://www.1mg.com" },
    { name: "Apollo Pharmacy", price: 25, delivery: "2-hour Delivery", url: "https://www.apollopharmacy.in" },
    { name: "NetMeds", price: 20, delivery: "Normal Delivery", url: "https://www.netmeds.com" },
    { name: "PharmEasy", price: 18, delivery: "Fast Delivery", url: "https://www.pharmeasy.in" }
  ],

  dolo650: [
    { name: "Tata 1mg", price: 30, delivery: "Fast Delivery", url: "https://www.1mg.com" },
    { name: "PharmEasy", price: 27, delivery: "Fast Delivery", url: "https://www.pharmeasy.in" }
  ]
};

// AI Logic: pick lowest price + fastest delivery
const pickBest = (list) => {
  return list.sort((a, b) => a.price - b.price)[0];
};

router.get("/search", (req, res) => {
  const q = req.query.q?.toLowerCase();

  if (!q)
    return res.json({ error: "No query provided" });

  const results = medicineData[q];

  if (!results)
    return res.json({ best: null, message: "Medicine not found" });

  const best = pickBest(results);

  return res.json({ best, results });
});

export default router;
