import express from "express";
const router = express.Router();

import {
  getLoginsView,
  postLogin
} from "../controllers/loginController.js";


router.get("/", getLoginsView);
router.post("/", postLogin);


// logout


export default router;