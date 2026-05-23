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

budgetSchema.virtual("amountot").get(function () {

    return this.amountmo + this.amountmat;

});

budgetSchema.set("toJSON", { virtuals: true });
budgetSchema.set("toObject", { virtuals: true });

const Budget = mongoose.model("Budget", budgetSchema);

export default Budget;