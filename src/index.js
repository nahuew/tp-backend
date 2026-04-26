require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

const loginRoutes = require("./routes/loginRouters");
const jobRoutes = require("./routes/jobRoutes");
const budgetRoutes = require("./routes/budgetRoutes");

app.use(express.json()); // Recibe el JSON en el cuerpo de las peticiones
app.use(express.urlencoded({ extended: true })); // Permite recibir datos de formularios


//--- MIDDLEWARES ---
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'pug');


// --- Ruta Archivos estáticos ---
app.use(express.static(path.join(__dirname, 'public')));


// --- Ruta Principal (Redirige al login por defecto) ---
app.get("/", (req, res) => {
    res.redirect("/login");
});

// --- Ruta De Pruebas ---
app.use("/login", loginRoutes);
app.use("/jobs", jobRoutes);
app.use("/budgets", budgetRoutes);

// --- Ruta public para css ---
app.use(express.static('public'));


// --- Iniciar servidor ---
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto http://localhost:${PORT}`);
});
