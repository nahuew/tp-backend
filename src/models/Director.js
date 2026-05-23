import mongoose from "mongoose";

const directorSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    specialty: {
        type: String,
        default: ""
    }

}, {
    timestamps: true
});

const Director = mongoose.model("Director", directorSchema);

export default Director;