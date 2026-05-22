import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({

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
    },

    estimateEndDate: {
        type: Date,
    }

}, {
    timestamps: true
});

const Job = mongoose.model("Job", jobSchema);

export default Job;