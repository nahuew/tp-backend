import Budget from "../models/Budget.js";
import Job from "../models/Job.js";

const statusMap = {
    waiting: "Pendiente",
    approved: "Aprobado",
    rejected: "Rechazado"
};

const handleError = (res, error) => {

    console.error(error);
    console.error("ERROR:", error.name, error.message);

    res.redirect("/budgets/view");

};


//CREATE NUEVO PRESUPUESTO
const createBudget = async (req, res) => {

    try {

        const { 
            idCustomer,
            nameCustomer, 
            amountmo,
            amountmat, 
            amountot, 
            status, 
            description,
            job_id 
        } = req.body;

        await Budget.create({
            idCustomer,
            nameCustomer,
            amountmo,
            amountmat,
            amountot,
            status,
            description,
            job_id
        });

        res.redirect("/budgets/view");

    } catch (error) {

        handleError(res, error);

    }
};

// GET TODOS LOS PRESUPUESTOS
const getBudgetsView = async (req, res) => {

    try {

        const budgets = await Budget.find({})
            .populate("job_id");

        res.render("budget", { 
            budgets, 
            jobId: null, 
            statusMap 
        });

    } catch (error) {

        handleError(res, error);

    }
};

// GET PRESUPUESTOS DE UNA OBRA
const getBudgetsByJob = async (req, res) => {

    try {

        const budgets = await Budget.find({ 
            job_id: req.params.jobId 
        }).populate("job_id");

        res.render("budget", { 
            budgets, 
            jobId: req.params.jobId, 
            statusMap 
        });

    } catch (error) {

        handleError(res, error);

    }
};


// FORMULARIO NUEVO PRESUPUESTO
const newBudgetForm = async (req, res) => {
    try {

        const jobs = await Job.find({});

        res.render("newBudget", {
            jobs
        });

    } catch (error) {

        handleError(res, error);
    }
};


// FORMULARIO EDITAR
const getEditBudgetForm = async (req, res) => {

    try {

        const budget = await Budget.findById(req.params.id);

        if (!budget) {
            return res.redirect("/budgets/view");  
        }

        const jobs = await Job.find({});

        res.render("editBudget", {
            budget,
            jobs
        });

    } catch (error) {

        handleError(res, error);

    }
};

// ACTUALIZAR PRESUPUESTO
const updateBudget = async (req, res) => {

    try {

        const { 
            idCustomer, 
            nameCustomer, 
            amountmo, 
            amountmat, 
            amountot, 
            status, 
            description 
        } = req.body;

        const budget = await Budget.findByIdAndUpdate(

            req.params.id,
            { 
                idCustomer, 
                nameCustomer, 
                amountmo, 
                amountmat, 
                amountot, 
                status, 
                description 
            },
            { 
                new: true, 
                runValidators: true 
            }
        );

        if (!budget) {

            return res.redirect("/budgets/view");  

        }

        res.redirect("/budgets/view");

    } catch (error) {

        handleError(res, error);

    }
};

// DETALLE DE PRESUPUESTO
const getBudgetById = async (req, res) => {

    try {

        const budget = await Budget.findById(req.params.id)
            .populate("job_id");

        if (!budget) {

            return res.redirect("/budgets/view");
        }

        res.render("detailBudget", {
            budget,
            statusMap
        });

    } catch (error) {

        handleError(res, error);

    }
};


export {
    getBudgetsByJob,
    getBudgetsView,
    createBudget,
    newBudgetForm,
    getEditBudgetForm,
    updateBudget,
    getBudgetById,
};