import express from "express";
import { authenticate } from "../middleware/auth.js";
import { permit } from "../middleware/roles.js";
import { getStats, listUsers, createUser, listStores } from "../controllers/adminController.js";

const router = express.Router();
router.use(authenticate, permit("admin"));

router.get("/stats", getStats);
router.post("/users", createUser);
router.get("/users", listUsers);
router.get("/stores", listStores);

export default router;
