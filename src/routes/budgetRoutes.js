const express = require("express");
const router = express.Router();

const {
    createBudget,
    getBudgetsView,
    assignBudgetToJob,
    getBudgetsByJob,
    newBudgetForm
} = require("../controllers/budgetController");


// CREAR PRESUPUESTO
router.get("/new", newBudgetForm);
router.post("/", createBudget);


// VISTA GENERAL
router.get("/view", getBudgetsView);


// VER PRESUPUESTOS DE UNA OBRA (FILTRADO)
router.get("/job/:jobId", getBudgetsByJob);


// ASIGNAR PRESUPUESTO A OBRA (DESPUÉS)
router.put("/:budgetId/assign/:jobId", assignBudgetToJob);


module.exports = router;