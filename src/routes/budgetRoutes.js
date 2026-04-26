const express = require("express");
const router = express.Router();

const {
  getBudgetsByJob,
  getBudgetsView
} = require("../controllers/budgetController");

router.get("/:jobId/view", getBudgetsView);  
router.get("/:jobId", getBudgetsByJob);       


module.exports = router;