    import express from "express";
    import passport from "passport";
    import {
        showLogin,
        showSignUp,
        userSignUp
    } from "../controllers/authController.js";

    const router = express.Router();

    // ----------------------
    // SIGN UP 
    // ----------------------
    router.get("/signUp", showSignUp);
    router.post("/signUp", userSignUp);

    // ----------------------
    // LOGIN
    // ----------------------
    router.get("/login", showLogin);

    router.post("/login", (req, res, next) => {
        passport.authenticate("local", (err, user, info) => {
            
            if (err) {
            req.session.flash = {
                type: "error",
                message: "Error interno del servidor"
            };
            return res.redirect("/login");
            }

            if (!user) {
            req.session.flash = {
                type: "error",
                message: info?.message || "Credenciales incorrectas"
            };
            return res.redirect("/login");
            }

            req.logIn(user, (err) => {
            if (err) {
                req.session.flash = {
                type: "error",
                message: "Error al iniciar sesión"
                };
                return res.redirect("/login");
            }

            req.session.flash = {
                type: "success",
                message: `Bienvenido ${user.name}`
            };

            return res.redirect("/jobs/view");
            });

        })(req, res, next);
    });

    router.get("/logout", (req, res, next) => {
    req.logout(function (err) {
        if (err) return next(err);

        req.session.destroy(() => {
        res.redirect("/login");
        });
    });
    });

    export default router;