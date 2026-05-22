import express from "express";
const router = express.Router();

import {
    getJobs,
    getJobsView,
    getJobById,
    createJob,
    updateJob,
    deleteJob,
    newJobForm,
    getJobDetailView
} from "../controllers/jobController.js";

// rutas CRUD

router.get("/view", getJobsView);
router.get("/new", newJobForm);
router.post("/", createJob);
router.get("/view/:id", getJobDetailView);
router.get("/:id", getJobById);
router.put("/:id", updateJob);
router.delete("/:id", deleteJob);
router.get("/", getJobs);


export default router;