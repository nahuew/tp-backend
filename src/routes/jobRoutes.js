const express = require("express");
const router = express.Router();

const {
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
} = require("../controllers/jobController");

// rutas CRUD

router.get("/view", getJobsView);
router.get("/new", newJobForm);
router.post("/", createJob);
router.get("/view/:id", getJobDetailView);
router.put("/:id", updateJob);
router.delete("/:id", deleteJob);
router.get("/", getJobs);


module.exports = router;