import mongoose from "mongoose";

const hospitalSchema = new mongoose.Schema({
  name: String,
  address: String,
  contactNumber: String,
  totalBeds: Number,
  availableBeds: Number,
  doctors: Number,
  specialties: [String],
  lat: Number,
  lng: Number
});

export default mongoose.model("Hospital", hospitalSchema);
