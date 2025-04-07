import express from "express";
import { login, register, updateProfile } from "../controllers/user.controller.js";
//import isAuthenticated from "../middleware/isauthenticated.js";

const router = express.Router();

router.post("/register",register);
router.post("/login",login)
router.post("/profile/update",updateProfile);

export default router;  