const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();

app.use(express.json()); // Recibe el JSON en el cuerpo de las peticiones
app.use(express.urlencoded({ extended: true })); // Permite recibir datos de formularios


// --- Iniciar servidor ---

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto http://localhost: ${PORT}`);
});


// --- MIDDLEWARES ---
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'pug');

// --- Ruta Archivos estáticos ---
app.use(express.static(path.join(__dirname, 'public')));

// --- Ruta De Pruebas ---
app.get('/', (req, res) => {
    // esta vacio porque como hay que hacerlo manual, por lo que dijo el profe,
    // depende de que tengamos las clases creadas
});