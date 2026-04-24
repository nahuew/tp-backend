const express = require("express");
const router = express.Router();

const {
  getAllBudgets,
  getBudgetsByJob,
  getBudgetsView,
  createBudget,
  updateBudget,
  deleteBudget
} = require("../controllers/budgetController");

router.get("/", getAllBudgets);
router.get("/:jobId/view", getBudgetsView);  // ← primero esta
router.get("/:jobId", getBudgetsByJob);       // ← luego esta
router.post("/", createBudget);
router.put("/:id", updateBudget);
router.delete("/:id", deleteBudget);


module.exports = router;