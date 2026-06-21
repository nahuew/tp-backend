import express from "express";
import {
    showLogin,
    showSignUp,
    userSignUp,
    login
} from "../controllers/authController.js";

const router = express.Router();

router.get("/signUp", showSignUp);
router.post("/signUp", userSignUp);

router.get("/login", showLogin);
router.post("/login", login);

export default router;