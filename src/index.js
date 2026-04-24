require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

const jobRoutes = require("./routes/jobRoutes");

app.use(express.json()); // Recibe el JSON en el cuerpo de las peticiones
app.use(express.urlencoded({ extended: true })); // Permite recibir datos de formularios


//--- MIDDLEWARES ---
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'pug');


// --- Ruta Archivos estáticos ---
app.use(express.static(path.join(__dirname, 'public')));


// --- Ruta De Pruebas ---
app.use("/jobs", jobRoutes);


// --- Iniciar servidor ---
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto http://localhost:${PORT}`);
});
