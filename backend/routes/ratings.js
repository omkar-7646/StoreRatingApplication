import express from "express";
import { authenticate } from "../middleware/auth.js";
import { permit } from "../middleware/roles.js";
import { submitRating } from "../controllers/ratingController.js";

const router = express.Router();

// User rating a store
router.post("/stores/:id", authenticate, permit("user", "owner", "admin"), submitRating);

export default router;
