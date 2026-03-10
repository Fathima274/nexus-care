// backend/server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

// Import routes
import userRouter from './routes/user.js';  // Import the user route
import hospitalsRouter from "./routes/hospitals.js";
import symptomsRouter from "./routes/symptoms.js"; // Import symptoms router
import authRouter from "./routes/auth.js";
import doctorsRouter from "./routes/doctors.js";
import reportsRouter from "./routes/reports.js";
import pharmaciesRouter from "./routes/pharmacies.js";       // ✅ Nearby / offline pharmacies
import aiMedicineRoutes from "./routes/aiMedicineRoutes.js";
import medicineRoutes from "./routes/medicineRoutes.js";
import onlinePharmacyRoutes from "./routes/onlinePharmacyRoutes.js";

dotenv.config();

const app = express();

// =======================
//       MIDDLEWARES
// =======================
app.use(cors());
app.use(express.json());

// =======================
//    SERVE UPLOADS
// =======================
app.use("/uploads", express.static("uploads"));  // required for images/pdfs to load

// =======================
//     MONGO CONNECTION
// =======================
const uri = process.env.MONGO_URI;

if (!uri) {
  console.error("❌ MONGO_URI missing in .env");
  process.exit(1);
}

mongoose
  .connect(uri)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// =======================
//          ROUTES
// =======================
app.use("/api/auth", authRouter);
app.use("/api/hospitals", hospitalsRouter);
app.use("/api/symptoms", symptomsRouter);  // Register symptomsRouter here
app.use("/api/doctors", doctorsRouter);
app.use("/api/reports", reportsRouter);
app.use("/api/pharmacies", pharmaciesRouter);              // 🏪 Offline pharmacies
app.use("/api/medicine", aiMedicineRoutes);
app.use("/api/medicine", medicineRoutes);
app.use("/api/online-pharmacy", onlinePharmacyRoutes);

// =======================
//    USER PROFILE ROUTE
// =======================
app.use("/api/user", userRouter);  // Register the user route for profile

// =======================
//       DEFAULT ROUTE
// =======================
app.get("/", (req, res) => res.send("Backend running successfully 🚀"));

// =======================
//       START SERVER
// =======================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
