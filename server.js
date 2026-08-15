dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));

const uri = process.env.MONGO_URI;

if (!uri) {
  console.error("❌ MONGO_URI missing in .env");
  process.exit(1);
}

// MongoDB connection middleware
app.use(async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(uri);
      console.log("✅ MongoDB connected");
    }

    next();
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);

    res.status(500).json({
      message: "Database connection failed",
      error: error.message,
    });
  }
});

// Routes
app.use("/api/auth", authRouter);
app.use("/api/hospitals", hospitalsRouter);
app.use("/api/symptoms", symptomsRouter);
app.use("/api/doctors", doctorsRouter);
app.use("/api/reports", reportsRouter);
app.use("/api/pharmacies", pharmaciesRouter);
app.use("/api/medicine", aiMedicineRoutes);
app.use("/api/medicine", medicineRoutes);
app.use("/api/online-pharmacy", onlinePharmacyRoutes);

app.get("/", (req, res) => {
  res.send("Backend running successfully 🚀");
});

const PORT = process.env.PORT || 5000;

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

export default app;