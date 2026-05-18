const express = require("express");
const router = express.Router();

const {
    createBudget,
    getBudgetsView,
    assignBudgetToJob,
    getBudgetsByJob,
    newBudgetForm,
    getEditBudgetForm,
    updateBudget,
    getBudgetById

} = require("../controllers/budgetController");


// CREAR PRESUPUESTO
router.get("/new", newBudgetForm);
router.post("/", createBudget);


// VISTA GENERAL
router.get("/view", getBudgetsView);

//EDITAR PRESUPUESTO
router.get("/:id/edit", getEditBudgetForm);  // 
router.post("/:id/edit", updateBudget);       // 


// VER PRESUPUESTOS DE UNA OBRA (FILTRADO)
router.get("/job/:jobId", getBudgetsByJob);


// ASIGNAR PRESUPUESTO A OBRA (DESPUÉS)
router.put("/:budgetId/assign/:jobId", assignBudgetToJob);

// VER DETALLE DE UN PRESUPUESTO PARA EDITARLO  
router.get("/:id", getBudgetById);  


module.exports = router;