// backend/seed.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Hospital from "./models/Hospital.js";

dotenv.config();

const uri = process.env.MONGO_URI;

const hospitals = [
  {
    name: "KMC Hospital Mangalore",
    address: "Ambedkar Circle, Mangalore",
    contactNumber: "0824-2885555",
    totalBeds: 600,
    availableBeds: 140,
    doctors: 200,
    specialties: ["Emergency", "General", "Surgery"],
    lat: 12.9141,
    lng: 74.8560
  },
  {
    name: "AJ Hospital & Research Centre",
    address: "Kuntikana, Mangalore",
    contactNumber: "0824-2225533",
    totalBeds: 300,
    availableBeds: 80,
    doctors: 150,
    specialties: ["Emergency", "General", "Surgery"],
    lat: 12.9180,
    lng: 74.8421
  },
  {
    name: "Unity Hospital",
    address: "Falnir Road, Mangalore",
    contactNumber: "0824-2222345",
    totalBeds: 200,
    availableBeds: 60,
    doctors: 90,
    specialties: ["Emergency", "General"],
    lat: 12.8741,
    lng: 74.8569
  },
  {
    name: "Indiana Hospital",
    address: "Pumpwell, Mangalore",
    contactNumber: "0824-2880880",
    totalBeds: 250,
    availableBeds: 90,
    doctors: 110,
    specialties: ["Emergency", "General", "Pediatrics"],
    lat: 12.9005,
    lng: 74.8499
  },
  {
    name: "Father Muller Medical College Hospital",
    address: "Kankanady, Mangalore",
    contactNumber: "0824-2238000",
    totalBeds: 1250,
    availableBeds: 300,
    doctors: 300,
    specialties: ["Emergency", "General", "Surgery", "Neurology"],
    lat: 12.8535,
    lng: 74.8426
  },
  {
    name: "Highland Hospital",
    address: "Falnir, Mangalore",
    contactNumber: "0824-2222273",
    totalBeds: 150,
    availableBeds: 40,
    doctors: 70,
    specialties: ["Emergency", "General"],
    lat: 12.8762,
    lng: 74.8543
  }
];

async function seed() {
  await mongoose.connect(uri);

  await Hospital.deleteMany({});
  await Hospital.insertMany(hospitals);

  console.log("🌱 Hospitals restored successfully!");
  process.exit(0);
}

seed();
