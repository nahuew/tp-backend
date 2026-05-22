import express from "express";
import dotenv from "dotenv";
import path from "path";

import { fileURLToPath } from "url";

import { conectarDB } from "./config/db.js";

import loginRoutes from "./routes/loginRouters.js";
import jobRoutes from "./routes/jobRoutes.js";
import budgetRoutes from "./routes/budgetRoutes.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json()); // Recibe el JSON en el cuerpo de las peticiones
app.use(express.urlencoded({ extended: true })); // Permite recibir datos de formularios

//--- Pug ---
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'pug');      

// --- Ruta Archivos estáticos ---
app.use(express.static(path.join(__dirname, 'public')));

// --- Ruta Principal (Redirige al login por defecto) ---
app.get("/", (req, res) => {
    res.redirect("/login");
});

// --- Rutas ---
app.use("/login", loginRoutes);
app.use("/jobs", jobRoutes);
app.use("/budgets", budgetRoutes);


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
