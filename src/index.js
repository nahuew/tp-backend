import express from "express";
import dotenv from "dotenv";
import path from "path";
import session from "express-session";
import methodOverride from "method-override";
import passport from "./config/passport.js";
import http from "http";

import { Server } from "socket.io";
import { flashMiddleware } from "./middlewares/flash.js";
import { fileURLToPath } from "url";
import { conectarDB } from "./config/db.js";

import authRouter from "./routes/authRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import budgetRoutes from "./routes/budgetRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

const io = new Server(server);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --------------------
// SESSION CONFIG
// --------------------
app.use(session({
    secret: process.env.SESSION_SECRET || "mi_secreto_dev",
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        sameSite: "lax", 
        maxAge: 1000 * 60 * 60 // 1 hora
    }
}));

// --------------------
// BODY PARSERS
// --------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(methodOverride("_method"));

// --------------------
// PASSPORT CONFIG
// --------------------
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
});
app.use(flashMiddleware);

// --------------------
// CHAT CONFIG
// --------------------
io.on("connection", (socket) => {
    io.emit("users-online", io.engine.clientsCount);
    console.log("Usuario conectado:", socket.id);

    socket.on("chat:message", (data) => {
        io.emit("chat:message", {
            text: data.text,
            user: data.user || "Usuario",
            time: new Date().toLocaleTimeString("es-AR", {
                hour: "2-digit",
                minute: "2-digit"
            }),
            socketId: socket.id
        });
    });

    socket.on("disconnect", () => {
        io.emit("users-online", io.engine.clientsCount);
        console.log("Usuario desconectado:", socket.id);
    });
});
app.get("/chat", (req, res) => {
    res.render("chat");
});

// --------------------
// PUG
// --------------------
app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "pug");

// --------------------
// STATIC FILES
// --------------------
app.use(express.static(path.join(__dirname, "public")));

// --------------------
// ROUTES
// --------------------
app.get("/", (req, res) => {
    res.redirect("/login");
});

app.use("/", authRouter);
app.use("/jobs", jobRoutes);
app.use("/budgets", budgetRoutes);
app.use("/users", userRoutes);

// --------------------
// SERVER START
// --------------------
const iniciarServidor = async () => {
    try {
        await conectarDB();

        server.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error("Error al iniciar:", error);
    }
};

iniciarServidor();
