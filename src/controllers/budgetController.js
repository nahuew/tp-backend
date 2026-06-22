import Budget from "../models/Budget.js";
import Job from "../models/Job.js";

const statusMap = {
    waiting: "Pendiente",
    approved: "Aprobado",
    rejected: "Rechazado"
};

const handleError = (req, res, error) => {

    console.error(error);
    console.error("ERROR:", error.name, error.message);

    req.session.flash = {
        type: "error",
        message: "Ocurrió un error inesperado"
    };

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
            status,
            description,
            job_id
        } = req.body;

        const job = await Job.findById(job_id);

        if (!job) {

            req.session.flash = {
                type: "error",
                message: "Obra no encontrada"
            };

            return res.redirect("/budgets/view");
        }

        if (["completed", "cancelled"].includes(job.status)) {

            req.session.flash = {
                type: "error",
                message: "No se pueden agregar presupuestos a una obra finalizada o cancelada"
            };

            return res.redirect("/budgets/view");
        }

        await Budget.create({
            idCustomer,
            nameCustomer,
            amountmo,
            amountmat,
            status,
            description,
            job_id
        });

        req.session.flash = {
            type: "success",
            message: "Presupuesto creado correctamente"
        };

        res.redirect("/budgets/view");

    } catch (error) {

        handleError(req, res, error);

    }
};

// GET TODOS LOS PRESUPUESTOS
const getBudgetsView = async (req, res) => {

    try {

        const budgets = await Budget.find({})
            .populate("job_id")
            .sort({ createdAt: -1 });

        res.render("budget", {
            budgets,
            jobId: null,
            statusMap
        });

    } catch (error) {

        handleError(req, res, error);

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

        handleError(req, res, error);

    }
};


// FORMULARIO NUEVO PRESUPUESTO
const newBudgetForm = async (req, res) => {
    try {

        const jobs = await Job.find({
            status: { $in: ["planning", "active"] }
        });

        res.render("newBudget", {
            jobs
        });

    } catch (error) {

        handleError(req, res, error);
    }
};


// FORMULARIO EDITAR
const getEditBudgetForm = async (req, res) => {

    try {

        const budget = await Budget.findById(req.params.id);

        if (!budget) {

            req.session.flash = {
                type: "error",
                message: "Presupuesto no encontrado"
            };

            return res.redirect("/budgets/view");
        }

        const jobs = await Job.find({
            status: { $in: ["planning", "active"] }
        });

        res.render("editBudget", {
            budget,
            jobs
        });

    } catch (error) {

        handleError(req, res, error);

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
                status,
                description
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!budget) {

            req.session.flash = {
                type: "error",
                message: "Presupuesto no encontrado"
            };

            return res.redirect("/budgets/view");
        }

        req.session.flash = {
            type: "success",
            message: "Presupuesto actualizado correctamente"
        };
        res.redirect("/budgets/view");

    } catch (error) {

        handleError(req, res, error);

    }
};

// DETALLE DE PRESUPUESTO
const getBudgetById = async (req, res) => {

    try {

        const budget = await Budget.findById(req.params.id)
            .populate("job_id");

        if (!budget) {

            req.session.flash = {
                type: "error",
                message: "Presupuesto no encontrado"
            };

            return res.redirect("/budgets/view");
        }

        res.render("detailBudget", {
            budget,
            statusMap
        });

    } catch (error) {

        handleError(req, res, error);

    }
};

// DELETE
const deleteBudget = async (req, res) => {

    try {

        const budget = await Budget.findByIdAndDelete(req.params.id);

        if (!budget) {

            req.session.flash = {
                type: "error",
                message: "Presupuesto no encontrado"
            };

            return res.redirect("/budgets/view");
        }

        req.session.flash = {
            type: "success",
            message: "Presupuesto eliminado correctamente"
        };
        res.redirect("/budgets/view");

    } catch (error) {

        handleError(req, res, error);
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
    deleteBudget
};