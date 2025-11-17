import express from "express";
import { authenticate } from "../middleware/auth.js";
import { permit } from "../middleware/roles.js";
import {
  getMyStore,
  createMyStore,
  getMyStoreRatings,
  updateOwnerPassword,
} from "../controllers/ownerController.js";

const router = express.Router();

// Only authenticated owners can access these routes
router.use(authenticate, permit("owner"));

/**
 * GET /api/owner/store
 * Fetch owner’s store (if exists)
 */
router.get("/stores", getMyStore);

/**
 * POST /api/owner/store
 * Create store (an owner can create only ONE store)
 */
router.post("/store", createMyStore);

/**
 * GET /api/owner/ratings
 * Get all ratings submitted for the owner’s store
 */
router.get("/ratings", getMyStoreRatings);

/**
 * PUT /api/owner/password
 * Update owner password
 */
router.put("/password", updateOwnerPassword);

export default router;
