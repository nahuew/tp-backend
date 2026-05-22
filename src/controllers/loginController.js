import Login from "../models/Login.js";

const handleError = (res, error) => {

    console.error("ERROR:", error.name, error.message);
    console.error(error);

    if (error.name === "CastError") {

        return res.status(404).json({
            message: "Login no encontrado"
        });
    }
};

const getLoginsView = async (req, res) => {

    try {

        const logins = await Login.find();

        res.render("login", { logins });

    } catch (error) {

        handleError(res, error);
    }
};

const postLogin = async (req, res) => {

    const { username, password } = req.body;

    try {

        const newLogin = new Login({
            username,
            password
        });

        await newLogin.save();

        res.redirect("/jobs/view");

    } catch (error) {

        handleError(res, error);
    }
};

export {
    getLoginsView,
    postLogin
};