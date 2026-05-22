import express from "express";
const router = express.Router();

import {
    createBudget,
    getBudgetsView,
    getBudgetsByJob,
    newBudgetForm,
    getEditBudgetForm,
    updateBudget,
    getBudgetById

} from "../controllers/budgetController.js";


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


// ASIGNAR PRESUPUESTO A OBRA (DESPUÉS- funcionalidad extra, no es parte del flujo principal y falta desarrollar)
//router.put("/:budgetId/assign/:jobId", assignBudgetToJob);

// VER DETALLE DE UN PRESUPUESTO PARA EDITARLO  
router.get("/:id", getBudgetById);  


export default router;