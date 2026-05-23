import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    location: {
        type: String,
        enum: [
            "Buenos Aires",
            "Córdoba",
            "Santa Fe",
            "Mendoza",
        ],
        required: true
    },

    director_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Director",
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