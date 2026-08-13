// backend/models/Doctor.js
import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: { type: String, required: true },
  hospital: { type: String, required: true },
  phone: { type: String, required: false },
}, { timestamps: true });

export default mongoose.model("Doctor", DoctorSchema);
