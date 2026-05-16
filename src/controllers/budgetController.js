//conexion con MONGO
const Budget = require('../models/Budget');

const handleError = (res, error) => {
    console.error("ERROR:", error.name, error.message);
    if (error.name === "CastError") {
        return res.status(404).json({ message: "Presupuesto no encontrado" });
    }
};


//create budget
const createBudget = async (req, res) => {
    try {
        const { name, location, amount, status, startDate, estimatedEndDate, job_id, description } = req.body;
        const newBudget = await Budget.create({ name, location, amount, status, startDate, estimatedEndDate, job_id, description });
        res.status(201).json({ message: "Presupuesto creado", budget: newBudget });
    } catch (error) {
        handleError(res, error);
    }
};


// GET budgets by job_id
const getBudgetsByJob = async (req, res) => {
    try {
        const jobBudgets = await Budget.find({ job_id: req.params.jobId});

        if (jobBudgets.length === 0) {
            return res.status(404).json({ message: "No hay presupuestos para esta obra" });
        }

        res.json(jobBudgets);
    } catch (error) {
        handleError(res, error);
    }
};

// GET VIEW budgets by job_id
const getBudgetsView = async (req, res) => {
    try {
        const jobBudgets = await Budget.find({ job_id: req.params.jobId });
        res.render("budgets", { 
            budgets: jobBudgets,
            jobId: req.params.jobId
        });
    } catch (error) {
        handleError(res, error);
    }
};

module.exports = {
    getBudgetsByJob,
    getBudgetsView,
    createBudget
};