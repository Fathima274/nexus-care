// backend/seedPharmacies.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Pharmacy from "./models/Pharmacy.js";

dotenv.config();

const uri = process.env.MONGO_URI;

const pharmacies = [
  {
    name: "MedPlus Mangalore",
    address: "Maryhill, Mangalore",
    location: { lat: 12.91216, lng: 74.856595 },
    medicines: []
  },
  {
    name: "HealthCare Pharmacy",
    address: "Bejai, Mangalore",
    location: { lat: 12.918523, lng: 74.841673 },
    medicines: []
  },
  {
    name: "Wellness Forever",
    address: "Kankanady, Mangalore",
    location: { lat: 12.853937, lng: 74.857241 },
    medicines: []
  },
  {
    name: "Vikash Medical Store",
    address: "Kadri, Mangalore",
    location: { lat: 12.895273, lng: 74.848322 },
    medicines: []
  },
  {
    name: "City Medicals",
    address: "Urwa, Mangalore",
    location: { lat: 12.904133, lng: 74.825675 },
    medicines: []
  },
  {
    name: "Sri Durga Medicals",
    address: "Lalbagh, Mangalore",
    location: { lat: 12.892732, lng: 74.848344 },
    medicines: []
  }
];

async function seed() {
  await mongoose.connect(uri);

  await Pharmacy.deleteMany({});
  await Pharmacy.insertMany(pharmacies);

  console.log("🏪 Pharmacies seeded successfully!");
  process.exit(0);
}

seed();
