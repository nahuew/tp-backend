import rateLimit from "express-rate-limit";

export const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
        req.session.flash = {
            type: "error",
            message: "Demasiados intentos de login. Intentá de nuevo en 15 minutos."
        };
        return res.redirect("/login");
    }
});