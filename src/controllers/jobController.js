import Job from "../models/Job.js";
import Budget from "../models/Budget.js";

const handleError = (res, error) => {

    console.error("ERROR:", error.name, error.message);
    console.error(error);

    res.redirect("/jobs/view");
};

const budgetStatusMap = {
    waiting: "Pendiente",
    approved: "Aprobado",
    rejected: "Rechazado"
};

const statusMap = {
    planning:  "Planificada",
    active:    "Activa",
    completed: "Finalizada",
    cancelled: "Cancelada"
};

// GET ALL
const getJobs = async (req, res) => {

    try {

        const jobs = await Job.find()

        res.json(jobs);

    } catch (error) {

        handleError(res, error);
    }
};

// GET VIEW
const getJobsView = async (req, res) => {

    try {

        const jobs = await Job.find()

        res.render("index", {
            jobs,
            statusMap,
            query: req.query
        });

    } catch (error) {

        handleError(res, error);
    }
};

// GET BY ID
const getJobById = async (req, res) => {

    try {

        const job = await Job.findById(req.params.id)

        if (!job) {

            return res.status(404).json({
                message: "Obra no encontrada"
            });
        }

        res.json(job);

    } catch (error) {

        handleError(res, error);
    }
};

// FORMULARIO NUEVA OBRA
const newJobForm = async (req, res) => {

    try {

        res.render("newJob");

    } catch (error) {

        handleError(res, error);
    }
};

// CREATE
const createJob = async (req, res) => {

    try {

        const {
            name,
            location,
            director,
            status,
            startDate,
            estimateEndDate
        } = req.body;

        await Job.create({
            name,
            location,
            director,
            status,
            startDate,
            estimateEndDate
        });

        res.redirect("/jobs/view?success=true");

    } catch (error) {

        handleError(res, error);
    }
};


// GET DETAIL VIEW
const getJobDetailView = async (req, res) => {

    try {

        const job = await Job.findById(req.params.id);

        if (!job) {

            return res.redirect("/jobs/view");
        }

        const budgets = await Budget.find({
            job_id: job._id
        });
        
        res.render("detailJob", {
            job,
            budgets,
            statusMap,
            budgetStatusMap
        });

    } catch (error) {

        handleError(res, error);
    }
};

// UPDATE
const updateJob = async (req, res) => {

    try {

        const job = await Job.findById(req.params.id);

        if (!job) {

            return res.redirect("/jobs/view");
        }

        const {
            name,
            location,
            director,
            status
        } = req.body;

        job.name = name ?? job.name;
        job.location = location ?? job.location;
        job.director = director ?? job.director;
        job.status = status ?? job.status;

        await job.save();

        res.redirect("/jobs/view");

    } catch (error) {

        handleError(res, error);
    }
};

// DELETE
const deleteJob = async (req, res) => {

    try {

        const job = await Job.findByIdAndDelete(req.params.id);

        if (!job) {

            return res.redirect("/jobs/view");
        }

        await Budget.deleteMany({
            job_id: req.params.id
        });

        res.redirect("/jobs/view");

    } catch (error) {

        handleError(res, error);
    }
};

export {
    getJobs,
    getJobsView,
    getJobById,
    createJob,
    updateJob,
    deleteJob,
    newJobForm,
    getJobDetailView,
};