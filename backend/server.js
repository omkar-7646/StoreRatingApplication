import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { dbInit } from "./models/index.js";

import authRoutes from "./routes/auth.js";
import adminRoutes from "./routes/admin.js";
import storeRoutes from "./routes/stores.js";
import ratingRoutes from "./routes/ratings.js";
import ownerRoutes from "./routes/owner.js";
import userRoutes from "./routes/users.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ----------- ROUTES -------------
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/stores", storeRoutes);
app.use("/api/ratings", ratingRoutes);
app.use("/api/owner", ownerRoutes);
app.use("/api/users", userRoutes);

// ----------- ERROR HANDLER (must be BEFORE app.listen) -------------
app.use((err, req, res, next) => {
  console.error("🔥 SERVER ERROR:", err);
  res.status(500).json({
    message: "Internal Server Error",
    error: err.message,
  });
});

// ----------- INIT DB + START SERVER -------------
dbInit().then(() => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
