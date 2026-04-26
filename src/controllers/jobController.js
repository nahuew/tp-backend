const fs = require("fs");
const path = require("path");
const Job = require("../models/Job");
const jobsPath = path.join(__dirname, "../data/job.json");

// Reads data from the JSON file and returns it as a JavaScript object
const jobsDataReader = () => {
    try {
        const data = fs.readFileSync(jobsPath, "utf-8");
        return JSON.parse(data || "[]");
    } catch (error) {
        console.error("Error leyendo datos de obras:", error);
        return [];
    }

};

// Writes the provided data to the JSON file, converting it to a string format
const jobsDataSaver = (jobs) => {
    fs.writeFileSync(
        jobsPath,
        JSON.stringify(jobs, null, 2)
    );

};


// GET ALL
const getJobs = (req, res) => {
    const jobs = jobsDataReader();
    res.json(jobs);
    
};

// GET VIEW
const getJobsView = (req, res) => {
    const jobs = jobsDataReader();
    res.render("index", { 
    jobs,
    query: req.query
    });
};

// GET BY ID
const getJobById = (req, res) => {
    const jobs = jobsDataReader();
    const id = parseInt(req.params.id);
    const job = jobs.find(j => j.id === id);
    if (!job) {
        return res.status(404).json({
            message: "Obra no encontrada"
        });
    }
    res.json(job);
};


// CREATE
const createJob = (req, res) => {
    const jobs = jobsDataReader();
    const { name, location, director, status, startDate, estimateEndDate } = req.body;
    const newJob = new Job(name, location, director, status, startDate, estimateEndDate);
    
    jobs.push(newJob);
    jobsDataSaver(jobs);

    if (req.headers["content-type"] === "application/json") {
        return res.status(201).json({
            message: "Obra creada",
            job: newJob
        });
    }

    res.redirect("/jobs/view?success=1");
};

// RENDER NEW JOB FORM
const newJobForm = (req, res) => {
    res.render("new");
};

// GET DETAIL VIEW
const getJobDetailView = (req, res) => {
    const jobs = jobsDataReader();
    const id = parseInt(req.params.id);
    const job = jobs.find(j => j.id === id);

    if (!job) {
        return res.status(404).send("Obra no encontrada");
    }

    res.render("detail", { job });
};

// UPDATE
const updateJob = (req, res) => {
    const jobs = jobsDataReader();
    const id = parseInt(req.params.id);
    const job = jobs.find(j => j.id === id);

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

    jobsDataSaver(jobs);

    res.json({
        message: "Obra actualizada",
        job
    });
};

// DELETE
const deleteJob = (req, res) => {
    const jobs = jobsDataReader();
    const id = parseInt(req.params.id);
    const newJobs = jobs.filter(j => j.id !== id);

    if (jobs.length === newJobs.length) {
        return res.status(404).json({
            message: "Obra no encontrada"
        });
    }
    jobsDataSaver(newJobs);

    res.json({
        message: "Obra eliminada"
    });

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