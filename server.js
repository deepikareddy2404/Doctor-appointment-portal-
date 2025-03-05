const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config(); // Load .env variables

const app = express();
app.use(cors());
app.use(express.json());

// Debug: Check if MONGO_URI is loading correctly
console.log("MongoDB URI:", process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 5000, // Timeout for connection
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch((error) => console.error("❌ MongoDB connection error:", error));

const appointmentRoutes = require("./routes/appointmentRoutes");
const userRoutes = require("./routes/userRoutes");

app.use("/api/appointments", appointmentRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
