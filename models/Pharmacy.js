import mongoose from "mongoose";

const PharmacySchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: String,
  contactNumber: String,
  website: String,

  medicines: {
    type: [
      {
        name: String,
        price: Number,
        discount: Number,
        deliveryTime: String
      }
    ],
    default: []
  },

  location: {
    lat: Number,
    lng: Number,
  }
}, { timestamps: true });

export default mongoose.model("Pharmacy", PharmacySchema);
