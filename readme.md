# Cimientos Sólidos S.A. - Backend

Aplicación web backend para administrar obras, presupuestos y usuarios de una empresa constructora.

El proyecto está desarrollado con Node.js, Express, MongoDB, Mongoose y Pug. Incluye autenticación con Passport, sesiones, roles de usuario, vistas server-side y chat interno con Socket.IO.

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
- method-override
- Socket.IO
- Nodemon
- Node Test Runner

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

## Variables de entorno

Crear un archivo `.env` en la raíz del proyecto. Se puede tomar como base `.env.example`.

Ejemplo para entorno local:

```env
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/Cimientos_Solidos_SA
SESSION_SECRET=un_secreto_para_desarrollo
```

Variables disponibles:

| Variable | Descripción |
|---|---|
| `PORT` | Puerto donde corre la aplicación. Por defecto usa `3000`. |
| `MONGO_URI` | String de conexión a MongoDB. |
| `SESSION_SECRET` | Clave usada para firmar la sesión de Express. |

## Base de datos

Para usar MongoDB localmente, iniciar MongoDB Community Server y conectarse a:

```text
mongodb://127.0.0.1:27017
```

Con MongoDB Compass se puede inspeccionar la base:

```text
Cimientos_Solidos_SA
```

## Datos de prueba

El proyecto incluye un seed que limpia la base y crea usuarios, directores, obras y presupuestos de ejemplo.

Ejecutar:

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

## Ejecutar la aplicación

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
- Vistas Pug con estilos centralizados.
- Tests basicos de vistas, assets y validacion de password.

## Permisos

Los permisos principales están definidos en:

```text
src/config/permissionMap.js
```

Resumen:

| Módulo | User | Admin |
|---|---|---|
| Obras | Ver, crear, editar | Ver, crear, editar, eliminar |
| Presupuestos | Ver, crear, editar | Ver, crear, editar, eliminar |
| Usuarios | Sin acceso | Ver, cambiar rol, eliminar |

## Rutas principales

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

## Estructura del proyecto

```text
src/
  config/        Configuración de base de datos, Passport y permisos
  controllers/   Lógica de controladores
  middlewares/   Autenticación, roles, permisos y flash
  models/        Modelos de Mongoose
  public/        CSS, JavaScript del cliente e imágenes
  routes/        Rutas de Express
  seeds/         Script para cargar datos de prueba
  utils/         Utilidades compartidas
  views/         Vistas Pug
  index.js       Punto de entrada de la aplicación

test/
  smoke.test.js  Pruebas básicas del proyecto
```

## Tests

Ejecutar:

```bash
npm test
```

Actualmente las pruebas verifican:

- Que todas las vistas Pug compilen.
- Que los assets locales referenciados por las vistas existan.
- Que la validación de password respete las reglas del proyecto.

## Errores comunes

### Cannot find module

Instalar dependencias:

```bash
npm install
```

### Error de conexión a MongoDB

Verificar que MongoDB esté iniciado.

En Windows:

```text
services.msc
```

Buscar `MongoDB Server` y confirmar que esté en estado `Running`.

### Credenciales incorrectas

Si se usa el seed, iniciar sesión con:

```text
admin@test.com / admin123
```

o:

```text
user@test.com / user123
```

## Notas de desarrollo

- El proyecto usa ES Modules, por eso se utiliza `import/export`.
- Las eliminaciones desde formularios usan `method-override` con `?_method=DELETE`.
- Las rutas de obras y presupuestos requieren usuario autenticado.
- Las acciones destructivas están restringidas al rol `admin`.
- El estilo visual esta centralizado en `src/public/css/style.css`.

## Autor

Proyecto académico desarrollado para práctica de backend con Node.js, Express y MongoDB.
