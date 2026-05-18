//conexion con MONGO
const Budget = require('../models/Budget');

const statusMap = {
    waiting: "Pendiente de Aprobación",
    approved: "Aprobado",
    rejected: "Rechazado"
};

const handleError = (res, error) => {
    console.error("ERROR:", error.name, error.message);
    res.redirect("/budgets/view");
};


//CREATE CREA UN NUEVO PRESUPUESTO SIN ASINGAR OBRA
const createBudget = async (req, res) => {
    try {
        const { idCustomer,nameCustomer, locationJob, amountmo,amountmat, amountot, status, description,job_id } = req.body;

        await Budget.create({
            idCustomer,
            nameCustomer,
            locationJob,
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

// GET TODOS LOS PRESUPUESTOS
const getBudgetsView = async (req, res) => {
    try {
        const budgets = await Budget.find({});
        res.render("budget", { budgets, jobId: null, statusMap });
    } catch (error) {
        handleError(res, error);
    }
};
// GET MUESTRA LOS PRESUPUESTOS DE UNA OBRA
const getBudgetsByJob = async (req, res) => {
    try {
        const budgets = await Budget.find({ job_id: req.params.jobId });
        res.render("budget", { budgets, jobId: req.params.jobId, statusMap });
    } catch (error) {
        handleError(res, error);
    }
};

//ASSING ASIGNA PRESUPUESTO A UNA OBRA
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

// GET FORMULARIO NUEVO PRESUPUESTO
const newBudgetForm = (req, res) => {
    res.render("newBudget");
};


// GET FORMULARIO EDITAR
const getEditBudgetForm = async (req, res) => {
    try {
        const budget = await Budget.findById(req.params.id);

        if (!budget) {
            return res.redirect("/budgets/view");  // 
        }

        res.render("editBudget", { budget });
    } catch (error) {
        handleError(res, error);
    }
};

// POST ACTUALIZAR PRESUPUESTO
const updateBudget = async (req, res) => {
    try {
        const { idCustomer, nameCustomer, locationJob, amountmo, amountmat, amountot, status, description } = req.body;

        const budget = await Budget.findByIdAndUpdate(
            req.params.id,
            { idCustomer, nameCustomer, locationJob, amountmo, amountmat, amountot, status, description },
            { new: true, runValidators: true }
        );

        if (!budget) {
            return res.redirect("/budgets/view");  // 
        }

        res.redirect("/budgets/view");
    } catch (error) {
        handleError(res, error);
    }
};

// GET DETALLE DE UN PRESUPUESTO
const getBudgetById = async (req, res) => {
    try {
        const budget = await Budget.findById(req.params.id);
        if (!budget) return res.redirect("/budgets/view");
        res.render("detailBudget", { budget, statusMap });
    } catch (error) {
        handleError(res, error);
    }
};


module.exports = {
    getBudgetsByJob,
    getBudgetsView,
    createBudget,
    assignBudgetToJob,
    newBudgetForm,
    getEditBudgetForm,
    updateBudget,
    getBudgetById
};