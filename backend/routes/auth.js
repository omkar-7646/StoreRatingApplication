import express from "express";
import { register, login } from "../controllers/authController.js";
import { validateUserPayload } from "../middleware/validation.js";

const router = express.Router();
router.post("/register", validateUserPayload, register);
router.post("/login", login);

export default router;
