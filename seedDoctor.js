import mongoose from "mongoose";
import dotenv from "dotenv";
import Doctor from "./models/Doctor.js";

dotenv.config();

const doctors = [
  {
    name: "Dr. Prashanth Shetty",
    specialization: "Cardiologist",
    hospital: "KMC Hospital Mangalore",
    phone: "0824-2885555"
  },
  {
    name: "Dr. Shalini Rao",
    specialization: "Pediatrician",
    hospital: "AJ Hospital & Research Centre",
    phone: "0824-2225533"
  },
  {
    name: "Dr. Mohammed Asif",
    specialization: "General Physician",
    hospital: "Unity Hospital",
    phone: "0824-2222345"
  },
  {
    name: "Dr. Anitha Kumar",
    specialization: "Neurologist",
    hospital: "Father Muller Medical College Hospital",
    phone: "0824-2238000"
  },
  {
    name: "Dr. Rahul Bhat",
    specialization: "Orthopedic Surgeon",
    hospital: "Indiana Hospital",
    phone: "0824-2880880"
  },
  {
    name: "Dr. Sneha Pai",
    specialization: "Dermatologist",
    hospital: "Highland Hospital",
    phone: "0824-2222273"
  }
];

async function seedDoctors() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Doctor.deleteMany({});
    await Doctor.insertMany(doctors);

    console.log("👨‍⚕️ Doctors seeded successfully!");

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding doctors:", error);
    process.exit(1);
  }
}

seedDoctors();