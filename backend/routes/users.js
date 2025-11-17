import express from "express";
import { authenticate } from "../middleware/auth.js";
import { updatePassword, getUserDetails } from "../controllers/userController.js";

const router = express.Router();
router.use(authenticate);
router.get("/me", getUserDetails);
router.post("/password", updatePassword);

export default router;
