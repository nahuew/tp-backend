import express from "express";
import dotenv from "dotenv";
import path from "path";

import { fileURLToPath } from "url";

import { conectarDB } from "./config/db.js";

import authRouter from "./routes/authRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import budgetRoutes from "./routes/budgetRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- Middlewares ---
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Pug ---
app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "pug");

// --- Static files ---
app.use(express.static(path.join(__dirname, "public")));

// --- Ruta principal ---
app.get("/", (req, res) => {
    res.redirect("/login");
});

// --- RUTAS (CORREGIDO) ---
// ❌ antes: app.use("/login", loginRoutes);

app.use("/", authRouter);       // 👈 login + signUp viven acá
app.use("/jobs", jobRoutes);
app.use("/budgets", budgetRoutes);

// --- Server ---
const iniciarServidor = async () => {
    try {
        await conectarDB();

        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error("Error al iniciar:", error);
    }
};

iniciarServidor();
