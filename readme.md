# Cimientos Sólidos S.A. - Backend

Aplicación web backend para administrar obras, presupuestos y usuarios de una empresa constructora.

El proyecto está desarrollado con Node.js, Express, MongoDB, Mongoose y Pug. Incluye autenticación con Passport, sesiones, roles de usuario, rate limiting para login, vistas server-side, chat interno con Socket.IO e integración opcional con Gemini.

## Tecnologías

- Node.js
- Express
- ES Modules
- MongoDB
- Mongoose
- Pug
- Passport Local
- bcrypt
- express-session
- express-rate-limit
- method-override
- Socket.IO
- Google Generative AI
- Nodemon
- Node Test Runner
- mongodb-memory-server para tests de modelos

## Requisitos

- Node.js
- MongoDB Community Server
- Git
- MongoDB Compass opcional, solo para visualizar la base de datos

## Instalación

Clonar el repositorio:

```bash
git clone URL_DEL_REPOSITORIO
cd tp-backend
```

Instalar dependencias:

```bash
npm install
```

## Variables De Entorno

Crear un archivo `.env` en la raíz del proyecto. Se puede tomar como base `.env.example`.

Ejemplo para entorno local:

```env
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/Cimientos_Solidos_SA
SESSION_SECRET=un_secreto_para_desarrollo
GEMINI_API_KEY=tu_api_key_de_google_ai_studio
```

| Variable | Descripción |
|---|---|
| `PORT` | Puerto donde corre la aplicación. Por defecto usa `3000`. |
| `MONGO_URI` | String de conexión a MongoDB. |
| `SESSION_SECRET` | Clave usada para firmar la sesión de Express. |
| `GEMINI_API_KEY` | API key de Google AI Studio para responder consultas desde el chat con `@gemini`. |

## Base De Datos

Para usar MongoDB localmente, iniciar MongoDB Community Server y conectarse a:

```text
mongodb://127.0.0.1:27017
```

Con MongoDB Compass se puede inspeccionar la base:

```text
Cimientos_Solidos_SA
```

## Datos De Prueba

El proyecto incluye un seed que limpia la base y crea usuarios, directores, obras y presupuestos de ejemplo.

```bash
npm run seed
```

El archivo del seed está en:

```text
src/seeds/seed.js
```

Usuarios creados por el seed:

| Rol | Email | Password |
|---|---|---|
| Admin | `admin@test.com` | `admin123` |
| User | `user@test.com` | `user123` |

## Scripts

| Comando | Descripción |
|---|---|
| `npm start` | Inicia la app con Nodemon. |
| `npm run dev` | Inicia la app en modo desarrollo con Nodemon. |
| `npm run seed` | Carga datos de prueba en MongoDB. |
| `npm test` | Ejecuta pruebas con el test runner nativo de Node. |

## Ejecutar La Aplicación

Con MongoDB iniciado y el archivo `.env` configurado:

```bash
npm run dev
```

Abrir en el navegador:

```text
http://localhost:3000
```

La raíz `/` redirige a `/login`.

## Funcionalidades

- Registro e inicio de sesión.
- Autenticación con Passport Local.
- Passwords hasheadas con bcrypt.
- Sesiones con `express-session`.
- Límite de intentos incorrectos de login con `express-rate-limit`.
- Mensajes flash para acciones del sistema.
- Roles `admin` y `user`.
- Administración de usuarios para admins.
- CRUD de obras.
- CRUD de presupuestos.
- Relación entre obras, presupuestos y directores.
- Restricción para no agregar presupuestos a obras finalizadas o canceladas.
- Eliminación protegida por permisos.
- Confirmación visual antes de eliminar.
- Chat interno en tiempo real con Socket.IO.
- Respuestas de Gemini en el chat usando mensajes que empiezan con `@gemini`.
- Vistas Pug con estilos centralizados.
- Tests unitarios y smoke tests.

## Permisos

Los permisos principales están definidos en:

```text
src/config/permissionMap.js
```

| Módulo | User | Admin |
|---|---|---|
| Obras | Ver, crear, editar | Ver, crear, editar, eliminar |
| Presupuestos | Ver, crear, editar | Ver, crear, editar, eliminar |
| Usuarios | Sin acceso | Ver, cambiar rol, eliminar |

## Rutas Principales

### Autenticación

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/login` | Vista de login |
| POST | `/login` | Iniciar sesión |
| GET | `/signUp` | Vista de registro |
| POST | `/signUp` | Crear usuario |
| GET | `/logout` | Cerrar sesión |

### Obras

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/jobs/view` | Lista de obras |
| GET | `/jobs/view/:id` | Detalle visual de una obra |
| GET | `/jobs/new` | Formulario de nueva obra |
| POST | `/jobs` | Crear obra |
| GET | `/jobs/:id/edit` | Formulario de edición de obra |
| POST | `/jobs/:id/edit` | Actualizar obra |
| DELETE | `/jobs/:id` | Eliminar obra |
| GET | `/jobs` | Obtener obras en JSON |
| GET | `/jobs/:id` | Obtener una obra en JSON |

### Presupuestos

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/budgets/view` | Lista de presupuestos |
| GET | `/budgets/new` | Formulario de nuevo presupuesto |
| POST | `/budgets` | Crear presupuesto |
| GET | `/budgets/job/:jobId` | Presupuestos asociados a una obra |
| GET | `/budgets/:id` | Detalle de presupuesto |
| GET | `/budgets/:id/edit` | Formulario de edición de presupuesto |
| POST | `/budgets/:id/edit` | Actualizar presupuesto |
| DELETE | `/budgets/:id` | Eliminar presupuesto |

### Usuarios

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/users` | Administración de usuarios |
| POST | `/users/:id/role` | Cambiar rol |
| POST | `/users/:id/delete` | Eliminar usuario |

### Chat

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/chat` | Chat interno |

## Integración Con Gemini

- La dependencia `@google/generative-ai` ya está incluida en `package.json`.
- Para obtener la API key, ingresar a https://aistudio.google.com/api-keys.
- En el archivo local `.env`, configurar `GEMINI_API_KEY` como indica `.env.example`.
- En el chat, para invocar a Gemini, comenzar el mensaje con `@gemini`.
- Ejemplo: `@gemini ¿Qué es Cimientos Sólidos?`

## Estructura Del Proyecto

```text
src/
  config/        Configuración de base de datos, Passport y permisos
  controllers/   Lógica de controladores
  middlewares/   Autenticación, roles, permisos, rate limit y flash
  models/        Modelos de Mongoose
  public/        CSS, JavaScript del cliente e imágenes
  routes/        Rutas de Express
  seeds/         Script para cargar datos de prueba
  utils/         Utilidades compartidas
  views/         Vistas Pug
  index.js       Punto de entrada de la aplicación

test/
  auth.test.js    Pruebas de autenticación y encriptación
  budget.test.js  Pruebas del modelo de presupuestos
  job.test.js     Pruebas del modelo de obras
  smoke.test.js   Pruebas básicas de vistas, assets y validaciones
```

## Tests

Ejecutar toda la suite:

```bash
npm test
```

Ejecutar un archivo puntual:

```bash
node --test test/budget.test.js
node --test test/job.test.js
node --test test/auth.test.js
node --test test/smoke.test.js
```

Actualmente las pruebas verifican:

- Encriptación y comparación de contraseñas.
- Validación de password.
- Compilación de vistas Pug.
- Existencia de assets locales referenciados por las vistas.
- Campos requeridos en formularios de obra y presupuesto.
- Creación, validaciones, estados y cálculos de modelos `Job` y `Budget`.

## Errores Comunes

### Cannot find module

Instalar dependencias:

```bash
npm install
```

### Error De Conexión A MongoDB

Verificar que MongoDB esté iniciado.

En Windows:

```text
services.msc
```

Buscar `MongoDB Server` y confirmar que esté en estado `Running`.

### Credenciales Incorrectas

Si se usa el seed, iniciar sesión con:

```text
admin@test.com / admin123
```

o:

```text
user@test.com / user123
```

### Gemini No Responde

Verificar que `GEMINI_API_KEY` exista en `.env` y que la API key sea válida.

## Notas De Desarrollo

- El proyecto usa ES Modules, por eso se utiliza `import/export`.
- Las eliminaciones desde formularios usan `method-override` con `?_method=DELETE`.
- Las rutas de obras y presupuestos requieren usuario autenticado.
- Las acciones destructivas están restringidas al rol `admin`.
- El estilo visual está centralizado en `src/public/css/style.css`.

## Autor

Proyecto académico desarrollado para práctica de backend con Node.js, Express y MongoDB.
