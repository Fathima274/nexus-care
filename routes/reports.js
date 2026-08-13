// backend/routes/reports.js
import express from "express";
import multer from "multer";
import Report from "../models/Report.js";

const router = express.Router();

// Multer file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

// =============================
// GET ALL REPORTS
// =============================
router.get("/", async (req, res) => {
  try {

    const reports = await Report.find().sort({ createdAt: -1 });

    // 🔥 Standardize field name for frontend
    const formatted = reports.map(r => ({
      _id: r._id,
      description: r.description,
      createdAt: r.createdAt,
      fileType: r.mimeType?.includes("pdf") ? "pdf" : "image",
      url: r.fileUrl   // 👈 frontend expects `url`
    }));

    res.json(formatted);

  } catch (err) {
    res.status(500).json({ error: "Error fetching reports" });
  }
});


// =============================
// UPLOAD REPORT
// =============================
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ error: "No file uploaded" });

    const fileUrl = `/uploads/${req.file.filename}`;

    const report = await Report.create({
      filename: req.file.filename,
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
      size: req.file.size,
      description: req.body.description || "",
      fileUrl: fileUrl       // stored correctly
    });

    res.json({
      _id: report._id,
      description: report.description,
      createdAt: report.createdAt,
      fileType: report.mimeType.includes("pdf") ? "pdf" : "image",
      url: report.fileUrl    // frontend uses this
    });

  } catch (err) {
    res.status(500).json({ error: "Upload failed" });
  }
});

export default router;
