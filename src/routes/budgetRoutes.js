const express = require("express");
const router = express.Router();

const { getBudgetsByJob, getBudgetsView, createBudget } = require("../controllers/budgetController");

router.post("/", createBudget); // 
router.get("/:jobId/view", getBudgetsView);
router.get("/:jobId", getBudgetsByJob);

module.exports = router;