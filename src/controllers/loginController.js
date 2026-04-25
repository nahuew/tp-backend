const fs = require("fs");
const path = require("path");
const Login = require("../models/Login");
const loginsPath = path.join(__dirname, "../data/login.json");

// funtion
const loginsDataReader = () => {
    try {
        const loginContent = fs.readFileSync(loginsPath, 'utf-8');
        return JSON.parse(loginContent || "[]");
    } catch (error) {
        console.error("Error leyendo datos de logins:", error);
        return [];
    }
};

const getLoginsView = (req, res) => {
    const logins = loginsDataReader();
    res.render("login", { logins });    
};

const postLogin = (req, res) => {
    const logins = loginsDataReader();
    const { username } = req.body;
    const newLogin = new Login(username);
    logins.push(newLogin);
    fs.writeFileSync(loginsPath, JSON.stringify(logins, null, 2));
    res.redirect("/jobs/view");
};

module.exports = {
    getLoginsView,
    postLogin
};