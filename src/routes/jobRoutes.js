import express from "express";
const router = express.Router();

import isAuth from "../middlewares/isAuth.js";
import { authorize } from "../middlewares/authorize.js";

import {
    getJobs,
    getJobsView,
    getJobById,
    createJob,
    updateJob,
    getEditJobForm,
    deleteJob,
    newJobForm,
    getJobDetailView
} from "../controllers/jobController.js";


router.use(isAuth);

// LISTA GENERAL
router.get("/", getJobs);

// VISTA (UI)
router.get("/view", getJobsView);

// FORM NUEVO
router.get("/new", newJobForm);

// CREAR
router.post("/", authorize("jobs", "create"), createJob);

// DETALLE UI
router.get("/view/:id", getJobDetailView);

// DETALLE API
router.get("/:id", getJobById);

// EDITAR
router.get("/:id/edit", getEditJobForm);
router.post("/:id/edit", authorize("jobs", "edit"), updateJob);

// ELIMINAR
router.delete("/:id", authorize("jobs", "delete"), deleteJob);

export default router;