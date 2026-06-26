import express from "express";

import {
  getUsersView,
  updateUserRole,
  deleteUser
} from "../controllers/userController.js";

import { isAdmin } from "../middlewares/roles.js";

const router = express.Router();

router.get("/", isAdmin, getUsersView);

router.post("/:id/role", isAdmin, updateUserRole);

router.post("/:id/delete", isAdmin, deleteUser);

export default router;