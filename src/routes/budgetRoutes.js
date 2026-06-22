import express from "express";
const router = express.Router();

import isAuth from "../middlewares/isAuth.js";
import { authorize } from "../middlewares/authorize.js";

import {
    createBudget,
    getBudgetsView,
    getBudgetsByJob,
    newBudgetForm,
    getEditBudgetForm,
    updateBudget,
    getBudgetById,
    deleteBudget
} from "../controllers/budgetController.js";

router.use(isAuth);

// CREAR PRESUPUESTO
router.get("/new", newBudgetForm);
router.post("/", authorize("budgets", "create"), createBudget);


// VISTA GENERAL
router.get("/view", getBudgetsView);


// EDITAR PRESUPUESTO
router.get("/:id/edit", getEditBudgetForm);
router.post("/:id/edit", authorize("budgets", "edit"), updateBudget);


// VER PRESUPUESTOS DE UNA OBRA
router.get("/job/:jobId", getBudgetsByJob);


// VER DETALLE DE UN PRESUPUESTO
router.get("/:id", getBudgetById);

// ELIMINAR PRESUPUESTO
router.delete("/:id", authorize("budgets", "delete"), deleteBudget);

export default router;