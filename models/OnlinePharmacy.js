import mongoose from "mongoose";

const pharmacySchema = new mongoose.Schema({
  name: String,
  rating: Number,
  offer: String,
  delivery: String,
  url: String
});

export default mongoose.model("OnlinePharmacy", pharmacySchema);
