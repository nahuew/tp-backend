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
        const { name, amountmo, amountmat, amountot, status, description } = req.body;

        await Budget.create({
            name,
            amountmo,
            amountmat,
            amountot,
            status,
            description,
            job_id: null
        });

        res.redirect("/budgets/view");
    } catch (error) {
        handleError(res, error);
    }
};

// GET 
const getBudgetsByJob = async (req, res) => {
    try {
        const jobBudgets = await Budget.find({ job_id: req.params.jobId });

        const statusMap = {
            waiting: "Pendiente de Aprobación",
            approved: "Aprobado",
            rejected: "Rechazado"
        };

        if (jobBudgets.length === 0) {
            return res.render("budgets", {
                budgets: [],
                jobId: req.params.jobId,
                statusMap
            });
        }

        return res.render("budgets", {
            budgets: jobBudgets,
            jobId: req.params.jobId,
            statusMap
        });

    } catch (error) {
        handleError(res, error);
    }
};

// GET VIEW 
const getBudgetsView = async (req, res) => {
    try {
        const jobBudgets = await Budget.find({ job_id: req.params.jobId });

        const statusMap = {
            waiting: "Pendiente de Aprobación",
            approved: "Aprobado",
            rejected: "Rechazado"
        };

        res.render("budgets", {
            budgets: jobBudgets,
            jobId: req.params.jobId,
            statusMap
        });

    } catch (error) {
        handleError(res, error);
    }
};

//ASIGNA PRESUPUESTO A UNA OBRA
const assignBudgetToJob = async (req, res) => {
    try {
        const { budgetId, jobId } = req.params;

        const budget = await Budget.findById(budgetId);

        if (!budget) {
            return res.status(404).json({ message: "Presupuesto no encontrado" });
        }

        budget.job_id = jobId;
        budget.status = "approved";

        await budget.save();

        res.json({ message: "Presupuesto asignado a la obra" });
    } catch (error) {
        handleError(res, error);
    }
};
const newBudgetForm = (req, res) => {
    res.render("newBudget");
};



module.exports = {
    getBudgetsByJob,
    getBudgetsView,
    createBudget,
    assignBudgetToJob,
    newBudgetForm
};