import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema({

    idCustomer: {
        type: Number,
        required: true
    },

    nameCustomer: {
        type: String,
        required: true
    },

    amountmo: { 
        type: Number,
        required: true
    },

    amountmat: {
        type: Number,
        required: true
    },

    amountot: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        enum: ["waiting", "approved", "rejected"],
        default: "waiting"
    },

    description: {
        type: String,
        default: ""
    },

    job_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
        required: true
    }

}, {
    timestamps: true
});

const Budget = mongoose.model("Budget", budgetSchema);

export default Budget;