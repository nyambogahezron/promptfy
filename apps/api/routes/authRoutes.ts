import express from "express";
import {
	forgotPassword,
	getCurrentUser,
	login,
	register,
	resetPassword,
	verifyEmail,
} from "../controllers/authController";
import { authenticateUser } from "../middleware/authentication";

const router = express.Router();

// Public routes
router.post("/register", register);
router.post("/login", login);
router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

// Protected routes
router.get("/me", authenticateUser, getCurrentUser);

export default router;
