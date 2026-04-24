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
} = require("../controllers/jobController");

// rutas CRUD

router.get("/", getJobs);
router.get("/view", getJobsView);
router.get("/new", newJobForm);
router.post("/", createJob);
router.get("/:id", getJobById);
router.put("/:id", updateJob);
router.delete("/:id", deleteJob);
router.get("/view/:id", getJobDetailView);


module.exports = router;