//conexion con MONGO
const Job = require('../models/Job');
const handleError = (res, error) => {
    console.error("ERROR:", error.name, error.message);
    if (error.name === "CastError") {
        return res.status(404).json({ message: "Obra no encontrada" });
    }
};



// GET ALL
const getJobs = async (req, res) => {
    try {
        const jobs = await Job.find();
        res.json(jobs);
    } catch (error) {
        handleError(res, error);
    }
};

// GET VIEW
const getJobsView = async (req, res) => {
    try {
        const jobs = await Job.find();
        res.render("index", { 
            jobs,
            query: req.query
        });
    } catch (error) {
        handleError(res, error);
    }
};


// GET BY ID
const getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) return res.status(404).json({ message: "Obra no encontrada" });
        res.json(job);
    } catch (error) {
        handleError(res, error);
    }
};

// CREATE
const createJob = async(req, res) => {
    try {
    const { name, location, director, status, startDate, estimateEndDate } = req.body;
    const newJob = await Job.create({ name, location, director, status, startDate, estimateEndDate });
    

    if (req.headers["content-type"] === "application/json") {
        return res.status(201).json({
            message: "Obra creada",
            job: newJob
        });
    }

     res.redirect("/jobs/view?success=1");
    } catch (error) {
        handleError(res, error);
    }
};

// RENDER NEW JOB FORM
const newJobForm = (req, res) => {
    res.render("new");
};

// GET DETAIL VIEW
const getJobDetailView = async(req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) {
            return res.status(404).send("Obra no encontrada");
        }
        res.render("detail", { job });
   } catch (error) {
        handleError(res, error);
    }
};

// UPDATE
const updateJob = async(req, res) => {
    try {
        const job = await Job.findById(req.params.id); // Busca la obra por ID en MongoDB
    if (!job) {
        return res.status(404).json({
            message: "Obra no encontrada"
        });
    }

    const { name, location, director, status } = req.body;
    job.name = name ?? job.name;
    job.location = location ?? job.location;
    job.director = director ?? job.director;
    job.status = status ?? job.status;

    await job.save(); // Guarda los cambios en MongoDB

    res.json({
        message: "Obra actualizada",
        job
    }); 
    } catch (error) {
        handleError(res, error);
    }
};
// DELETE
const deleteJob = async (req, res) => {
    try {
    const job = await Job.findByIdAndDelete(req.params.id); //  Elimina la obra por ID en MongoDB
    if (!job) {
        return res.status(404).json({
            message: "Obra no encontrada"
        });
    }
    res.json({
        message: "Obra eliminada"
    });
    } catch (error) {
        handleError(res, error);
    }
};


module.exports = {
    getJobs,
    getJobsView,
    getJobById,
    createJob,
    updateJob,
    deleteJob,
    newJobForm,
    getJobDetailView,
};