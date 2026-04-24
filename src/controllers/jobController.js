const fs = require("fs");
const path = require("path");
const Job = require("../models/Job");
const jobsPath = path.join(__dirname, "../data/job.json");
const budgetsPath = path.join(__dirname, "../data/budget.json");

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
    res.render("index", { jobs });
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
    res.status(201).json({
        message: "Obra creada",
        job: newJob
    });
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

// Read budgets
const readBudgets = () => {
    try {
        const data = fs.readFileSync(budgetsPath, "utf-8");
        return JSON.parse(data || "[]");
    } catch (error) {
        console.error("Error leyendo budgets:", error);
        return [];
    }
};

// GET budgets by job_id
const getBudgetsByJob = (req, res) => {
    const jobId = parseInt(req.params.jobId);
    console.log("Buscando presupuestos para obra ID:", jobId);
    const budgets = readBudgets();

    const jobBudgets = budgets.filter(b => b.job_id === jobId);

    if (jobBudgets.length === 0) {
        return res.status(404).json({
            message: "No hay presupuestos para esta obra"
        });
    }

    res.json(jobBudgets);
};

// GET VIEW budgets by job_id
const getBudgetsView = (req, res) => {
    const jobId = parseInt(req.params.jobId);

    const budgets = readBudgets();

    const jobBudgets = budgets.filter(b => b.job_id === jobId);

    res.render("budgets", { 
        budgets: jobBudgets,
        jobId
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
    getBudgetsByJob,
    getBudgetsView
};