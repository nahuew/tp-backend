const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
    name:               { type: String, required: true },
    location:           { type: String, required: true },
    amount:             { type: Number, required: true },
    status:             { type: String, enum: ["En espera", "Aprobado", "Rechazado"], default: "En espera" },
    startDate:          { type: Date, default: null },
    estimatedEndDate:   { type: Date, default: null },
    job_id:             { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
    description:        { type: String, default: '' }
});

module.exports = mongoose.model('Budget', budgetSchema);