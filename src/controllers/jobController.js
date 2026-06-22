import Job from "../models/Job.js";
import Budget from "../models/Budget.js";
import Director from "../models/Director.js";

const handleError = (res, error) => {
    console.error("ERROR:", error.name, error.message);
    console.error(error);

    return res.redirect("/jobs/view");
};

// MAPS
const budgetStatusMap = {
    waiting: "Pendiente",
    approved: "Aprobado",
    rejected: "Rechazado"
};

const statusMap = {
    planning: "Planificada",
    active: "Activa",
    completed: "Finalizada",
    cancelled: "Cancelada"
};

// GET ALL (API)
const getJobs = async (req, res) => {
    try {
        const jobs = await Job.find()
            .populate("director_id")
            .sort({ startDate: -1 });

        return res.json(jobs);

    } catch (error) {
        return handleError(res, error);
    }
};

// GET VIEW
const getJobsView = async (req, res) => {
    try {
        const jobs = await Job.find()
            .populate("director_id")
            .sort({ startDate: -1 });

        return res.render("index", {
            jobs,
            statusMap
        });

    } catch (error) {
        return handleError(res, error);
    }
};

// GET BY ID (API)
const getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id).populate("director_id");

        if (!job) {
            return res.status(404).json({ message: "Obra no encontrada" });
        }

        return res.json(job);

    } catch (error) {
        return handleError(res, error);
    }
};

// FORM NUEVA OBRA
const newJobForm = async (req, res) => {
    try {
        const directors = await Director.find();

        return res.render("newJob", {
            directors
        });

    } catch (error) {
        return handleError(res, error);
    }
};

// CREATE JOB
const createJob = async (req, res) => {
    try {
        const {
            name,
            location,
            director_id,
            status,
            startDate,
            estimateEndDate
        } = req.body;

        await Job.create({
            name,
            location,
            director_id,
            status,
            startDate,
            estimateEndDate
        });

        req.session.flash = {
            type: "success",
            message: "Obra creada correctamente"
        };

        return res.redirect("/jobs/view");

    } catch (error) {
        req.session.flash = {
            type: "error",
            message: "Error al crear la obra"
        };

        return res.redirect("/jobs/view");
    }
};

// DETAIL VIEW
const getJobDetailView = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id)
            .populate("director_id");

        if (!job) {
            req.session.flash = {
                type: "error",
                message: "Obra no encontrada"
            };
            return res.redirect("/jobs/view");
        }

        const budgets = await Budget.find({ job_id: job._id });

        return res.render("detailJob", {
            job,
            budgets,
            statusMap,
            budgetStatusMap
        });

    } catch (error) {
        return handleError(res, error);
    }
};

// FORM EDIT
const getEditJobForm = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id).populate("director_id");
        const directors = await Director.find();

        if (!job) {
            req.session.flash = {
                type: "error",
                message: "Obra no encontrada"
            };
            return res.redirect("/jobs/view");
        }

        return res.render("editJob", {
            job,
            directors
        });

    } catch (error) {
        return handleError(res, error);
    }
};

// UPDATE JOB
const updateJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            req.session.flash = {
                type: "error",
                message: "Obra no encontrada"
            };
            return res.redirect("/jobs/view");
        }

        const {
            name,
            location,
            director_id,
            status,
            startDate,
            estimateEndDate
        } = req.body;

        job.name = name ?? job.name;
        job.location = location ?? job.location;
        job.director_id = director_id ?? job.director_id;
        job.status = status ?? job.status;
        job.startDate = startDate ?? job.startDate;
        job.estimateEndDate = estimateEndDate ?? job.estimateEndDate;

        await job.save();

        req.session.flash = {
            type: "success",
            message: "Obra actualizada correctamente"
        };

        return res.redirect("/jobs/view");

    } catch (error) {
        req.session.flash = {
            type: "error",
            message: "Error al actualizar la obra"
        };

        return res.redirect("/jobs/view");
    }
};

// DELETE JOB
const deleteJob = async (req, res) => {
    try {
        const job = await Job.findByIdAndDelete(req.params.id);

        if (!job) {
            req.session.flash = {
                type: "error",
                message: "Obra no encontrada"
            };
            return res.redirect("/jobs/view");
        }

        await Budget.deleteMany({ job_id: req.params.id });

        req.session.flash = {
            type: "success",
            message: "Obra eliminada correctamente"
        };

        return res.redirect("/jobs/view");

    } catch (error) {
        req.session.flash = {
            type: "error",
            message: "Error al eliminar la obra"
        };

        return res.redirect("/jobs/view");
    }
};

export {
    getJobs,
    getJobsView,
    getJobById,
    createJob,
    getEditJobForm,
    updateJob,
    deleteJob,
    newJobForm,
    getJobDetailView,
};