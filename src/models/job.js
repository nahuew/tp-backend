const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    budget_id:          { type: mongoose.Schema.Types.ObjectId, ref: 'Budget', required: true },
    name:               { type: String, required: true },
    location:           { type: String, required: true },
    director:           { type: String, required: true },
    status:             { type: String, enum: ["planning", "active", "completed", "cancelled"], default: "planning" },
    startDate:          { type: Date, default: null },
    estimateEndDate:    { type: Date, default: null }
});

module.exports = mongoose.model('Job', jobSchema);