import express from "express";
import { authenticate } from "../middleware/auth.js";
import { permit } from "../middleware/roles.js";
import { createStore, listStores, getStoreDetails } from "../controllers/storeController.js";

const router = express.Router();
router.get("/", listStores);
router.get("/:id", getStoreDetails);
router.post("/", authenticate, permit("admin","owner"), createStore);

export default router;
