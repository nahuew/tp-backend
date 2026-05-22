import mongoose from "mongoose";

const loginSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    roles: {
        type: [String],
        default: ["user"]
    }

}, {
    timestamps: true
});

const Login = mongoose.model("Login", loginSchema);

export default Login;
