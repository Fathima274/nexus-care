import mongoose from "mongoose";

const ReportSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false }, // optional
  filename: { type: String, required: true },
  originalName: { type: String, required: true },
  mimeType: { type: String, required: true },
  size: { type: Number, required: true },
  description: { type: String },
  fileUrl: { type: String }, // will store served URL like /uploads/xxxx
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Report", ReportSchema);
