import express from "express";
import { authenticate } from "../middleware/auth.js";
import { submitRating, getRatingsForStore } from "../controllers/ratingController.js";

const router = express.Router();
router.post("/", authenticate, submitRating);
router.get("/store/:storeId", getRatingsForStore);

export default router;
