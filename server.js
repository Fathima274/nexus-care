// backend/server.js

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Routers
import hospitalsRouter from "./routes/hospitals.js";
import symptomsRouter from "./routes/symptoms.js";
import authRouter from "./routes/auth.js";
import doctorsRouter from "./routes/doctors.js";
import reportsRouter from "./routes/reports.js";
import pharmaciesRouter from "./routes/pharmacies.js";
import aiMedicineRoutes from "./routes/aiMedicineRoutes.js";
import medicineRoutes from "./routes/medicineRoutes.js";
import onlinePharmacyRoutes from "./routes/onlinePharmacyRoutes.js";

dotenv.config();

const app = express();

// =======================
//       CORS
// =======================

const allowedOrigins = [
  "http://localhost:5173",
  "https://nexus-care-rapu.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests without an origin
      // such as Postman/server-to-server requests
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log("❌ CORS blocked origin:", origin);
      return callback(new Error("Not allowed by CORS"));
    },

    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],

    allowedHeaders: [
      "Content-Type",
      "Authorization"
    ],

    credentials: true
  })
);

// =======================
//       MIDDLEWARE
// =======================

app.use(express.json());

// =======================
//       UPLOADS
// =======================

app.use("/uploads", express.static("uploads"));

// =======================
//     MONGO CONNECTION
// =======================

const uri = process.env.MONGO_URI;

if (!uri) {
  console.error("❌ MONGO_URI missing in environment variables");
} else {
  mongoose
    .connect(uri)
    .then(() => {
      console.log("✅ MongoDB connected");
    })
    .catch((error) => {
      console.error("❌ MongoDB connection error:", error);
    });
}

// =======================
//          ROUTES
// =======================

app.use("/api/auth", authRouter);

app.use("/api/hospitals", hospitalsRouter);

app.use("/api/symptoms", symptomsRouter);

app.use("/api/doctors", doctorsRouter);

app.use("/api/reports", reportsRouter);

app.use("/api/pharmacies", pharmaciesRouter);

app.use("/api/medicine", aiMedicineRoutes);

app.use("/api/medicine", medicineRoutes);

app.use("/api/online-pharmacy", onlinePharmacyRoutes);

// =======================
//       DEFAULT ROUTE
// =======================

app.get("/", (req, res) => {
  res.json({
    message: "Backend running successfully 🚀"
  });
});

// =======================
//       ERROR HANDLER
// =======================

app.use((err, req, res, next) => {
  console.error("❌ SERVER ERROR:", err);

  if (err.message === "Not allowed by CORS") {
    return res.status(403).json({
      message: "CORS blocked this request"
    });
  }

  res.status(500).json({
    message: "Server error",
    error: err.message
  });
});

// =======================
//       LOCAL SERVER
// =======================

const PORT = process.env.PORT || 5000;

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

// =======================
//       VERCEL EXPORT
// =======================

export default app;