import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import { dbInit } from "./models/index.js";
import authRoutes from "./routes/auth.js";
import adminRoutes from "./routes/admin.js";
import storeRoutes from "./routes/stores.js";
import ratingRoutes from "./routes/ratings.js";
import userRoutes from "./routes/users.js";

const app = express();
app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:3000", credentials: true }));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/stores", storeRoutes);
app.use("/api/ratings", ratingRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => res.send("Store Rating API"));

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await dbInit();
    app.listen(PORT, () => console.log(`Server started on ${PORT}`));
  } catch (err) {
    console.error("Failed to start:", err);
  }
})();
