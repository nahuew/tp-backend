require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/Cimientos_Solidos_SA')
  .then(() => console.log('✅ Conectado a MongoDB'))
  .catch((err) => console.log('❌ Error al conectar MongoDB:', err));

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
