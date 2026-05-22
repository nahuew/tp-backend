# Proyecto Backend - Cimientos Sólidos S.A.

Sistema backend desarrollado con:

- Node.js
- Express
- MongoDB
- Mongoose
- Pug

---

# Tecnologías utilizadas

- Node.js
- Express
- MongoDB
- MongoDB Compass
- Mongoose
- Pug
- Nodemon

---

# Requisitos previos

Antes de ejecutar el proyecto es necesario tener instalado:

- Node.js
- MongoDB Community Server
- MongoDB Compass
- Git (opcional)

---

# 1. Clonar el repositorio

```bash
git clone URL_DEL_REPOSITORIO
```

Entrar a la carpeta:

```bash
cd nombre-del-proyecto
```

---

# 2. Instalar dependencias

Ejecutar:

```bash
npm install
```

Esto creará automáticamente la carpeta:

```bash
node_modules
```

---

# 3. Verificar instalación de Express

Opcionalmente pueden verificar Express con:

```bash
npx express --version
```

o:

```bash
npm list express
```

---

# 4. Configurar MongoDB

## Instalar MongoDB Community Server

Descargar desde:

- https://www.mongodb.com/try/download/community

Durante la instalación dejar seleccionada la opción:

```text
Install MongoDB as a Service
```

---

# 5. Instalar MongoDB Compass

Descargar desde:

- https://www.mongodb.com/products/tools/compass

Compass permite visualizar gráficamente la base de datos.

---

# 6. Conectarse desde MongoDB Compass

Abrir MongoDB Compass.

En el campo de conexión colocar:

```text
mongodb://127.0.0.1:27017
```

Luego presionar:

```text
Connect
```

---

# 7. Configurar variables de entorno

Crear un archivo llamado:

```text
.env
```

En la raíz del proyecto.

Agregar:

```env
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/Cimientos_Solidos_SA
```

---

# 8. Iniciar el proyecto

Ejecutar:

```bash
npm start
```

o en modo desarrollo:

```bash
npm run dev
```

---

# 9. Verificar conexión MongoDB

Si todo funciona correctamente debería aparecer:

```bash
✅ MongoDB conectado
Servidor corriendo en http://localhost:3000
```

---

# 10. Acceder a la aplicación

Abrir en el navegador:

```text
http://localhost:3000
```

---

# Credenciales de Login

```text
Usuario: admin
Password: admin123
```

---

# Rutas principales

## Vistas (Pug)

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/jobs/view` | Lista de obras |
| GET | `/jobs/view/:id` | Detalle de una obra |
| GET | `/jobs/new` | Formulario nueva obra |
| GET | `/budgets/new` | Formulario nuevo presupuesto |
| GET | `/budgets/view` | Lista de presupuestos |
| GET | `/budgets/job/:jobId` | Presupuestos por obra |

---

# API REST (JSON)

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/jobs` | Obtener todas las obras |
| GET | `/jobs/:id` | Obtener obra por ID |
| POST | `/jobs` | Crear obra |
| PUT | `/jobs/:id` | Actualizar obra |
| DELETE | `/jobs/:id` | Eliminar obra |
| GET | `/budgets/job/:jobId` | Obtener presupuestos de una obra |

---

# Ejemplo POST /jobs

```json
{
  "budget_id": "ID_DEL_PRESUPUESTO",
  "name": "Construcción edificio",
  "location": "Resistencia",
  "director": "Juan Pérez",
  "status": "planning",
  "startDate": "2025-07-01",
  "estimateEndDate": "2026-01-01"
}
```

---

# Estructura del proyecto

```text
src/
│
├── config/
├── controllers/
├── models/
├── routes/
├── views/
├── public/
└── index.js
```

---

# Funcionalidades implementadas

- CRUD de obras
- CRUD de presupuestos
- Relación entre obras y presupuestos
- Motor de vistas Pug
- MongoDB con Mongoose
- Arquitectura MVC
- Programación asincrónica con async/await
- Manejo básico de errores
- Variables de entorno con dotenv

---

# Posibles errores comunes

## Error: Cannot find module

Ejecutar:

```bash
npm install
```

---

## Error de conexión MongoDB

Verificar que MongoDB Server esté iniciado.

En Windows:

```text
services.msc
```

Buscar:

```text
MongoDB Server
```

Debe estar en estado:

```text
Running
```

---

# Autor

Proyecto académico desarrollado para práctica de backend con Node.js y MongoDB.
