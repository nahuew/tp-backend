const fs = require("fs");
const path = require("path");

const budgetsPath = path.join(__dirname, "../data/budget.json");

// Read budgets
const readBudgets = () => {
    try {
        const data = fs.readFileSync(budgetsPath, "utf-8");
        return JSON.parse(data || "[]");
    } catch (error) {
        console.error("Error leyendo budgets:", error);
        return [];
    }
};

// GET budgets by job_id
const getBudgetsByJob = (req, res) => {
    const jobId = parseInt(req.params.jobId);
    console.log("Buscando presupuestos para obra ID:", jobId);
    const budgets = readBudgets();

    const jobBudgets = budgets.filter(b => b.job_id === jobId);

    if (jobBudgets.length === 0) {
        return res.status(404).json({
            message: "No hay presupuestos para esta obra"
        });
    }

    res.json(jobBudgets);
};

// GET VIEW budgets by job_id
const getBudgetsView = (req, res) => {
    const jobId = parseInt(req.params.jobId);
    const budgets = readBudgets();
    const jobBudgets = budgets.filter(b => b.job_id === jobId);

    res.render("budgets", { 
        budgets: jobBudgets,
        jobId
    });
};

module.exports = {
    getBudgetsByJob,
    getBudgetsView
};