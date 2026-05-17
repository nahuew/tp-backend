//conexion con MONGO
const Budget = require('../models/Budget');

const handleError = (res, error) => {
    console.error("ERROR:", error.name, error.message);
    if (error.name === "CastError") {
        return res.status(404).json({ message: "Presupuesto no encontrado" });
    }
};


//CREATE
const createBudget = async (req, res) => {
    try {
        const { name,amountmo,amountmat,amountot, status,job_id,description } = req.body;
        await Budget.create({ name, amountmo, amountmat, amountot, status,job_id, description });
        res.redirect(`/jobs/view/${job_id}`); // 
    } catch (error) {
        handleError(res, error);
    }
};


// GET 
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

// GET VIEW 
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

//RENDER CREATE VIEW
const newBudgetForm = (req, res) => {
    const jobId = req.params.jobId;
    res.render("newBudget", { jobId });
};

module.exports = {
    getBudgetsByJob,
    getBudgetsView,
    createBudget,
    newBudgetForm
};