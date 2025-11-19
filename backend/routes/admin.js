import express from "express";
import { authenticate } from "../middleware/auth.js";
import { permit } from "../middleware/roles.js";
import {
  getStats,
  listUsers,
  createUser,
  listStores,
  deleteUser,
  createStore,
  deleteStore
} from "../controllers/adminController.js";

const router = express.Router();

router.use(authenticate, permit("admin"));

router.get("/stats", getStats);
router.post("/users", createUser);
router.get("/users", listUsers);
router.delete("/stores/:id", deleteStore);
router.delete("/users/:id", deleteUser);
router.get("/stores", listStores);
router.post("/stores", createStore);

export default router;


