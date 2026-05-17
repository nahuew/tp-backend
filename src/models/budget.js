const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
    name:               { type: String, required: true },
    amountmo:           { type: Number, required: true },
    amountmat:          { type: Number, required: true },
    amountot:           { type: Number, required: true },
    status:             { type: String, enum: ["waiting", "approved", "rejected"], default: "waiting" },
    startDate:          { type: Date, default: null },
    estimatedEndDate:   { type: Date, default: null },
    job_id:             { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
    description:        { type: String, default: '' }
});

module.exports = mongoose.model('Budget', budgetSchema);