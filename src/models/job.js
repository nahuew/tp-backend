import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({

    budget_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Budget",
    default: null
    },

    name: {
        type: String,
        required: true
    },

    location: {
        type: String,
        required: true
    },

    director: {
        type: String,
        required: true
    },

    status: {
        type: String,
        enum: ["planning", "active", "completed", "cancelled"],
        default: "planning"
    },

    startDate: {
        type: Date,
        default: null
    },

    estimateEndDate: {
        type: Date,
        default: null
    }

}, {
    timestamps: true
});

const Job = mongoose.model("Job", jobSchema);

export default Job;