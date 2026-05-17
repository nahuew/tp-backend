const express = require("express");
const router = express.Router();

const {createBudget, getBudgetsByJob, getBudgetsView,newBudgetForm } = require("../controllers/budgetController");

router.get("/new/:jobId", newBudgetForm);
router.post("/", createBudget); // 
router.get("/:jobId/view", getBudgetsView);
router.get("/:jobId", getBudgetsByJob);


module.exports = router;