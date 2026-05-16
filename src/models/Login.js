const mongoose = require('mongoose');

const LoginSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    roles:    { type: [String], default: ["user"] }
});


module.exports = mongoose.model('Login', LoginSchema);
