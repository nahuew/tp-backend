#### AVISO LOGIN

El login lleva usuario y contraseña no van a poder entrar sino son:
user:admin 
password: admin123

### Para probar este proyecto:

1. Instalar dependencias con: `npm install`
2. Para iniciar el servidor en modo desarrollo: `npm start` o `npm run dev` 

### Rutas principales

#### Vistas (Pug)

- `GET /jobs/view` → Lista de obras  
- `GET /jobs/view/:id` → Detalle de una obra  
- `GET /jobs/new` → Formulario para crear una obra  
- `GET /budgets/:jobId/view` → Presupuestos de una obra 

#### API (JSON)

- `GET /jobs` → Obtener todas las obras  
- `GET /jobs/:id` → Obtener obra por ID  
- `POST /jobs` → Crear nueva obra  
- `PUT /jobs/:id` → Actualizar obra  
- `DELETE /jobs/:id` → Eliminar obra  
- `GET /budgest/:jobId/` → Presupuestos por obra  

#AVISO

Antes de instalar express tiren el comando npm express -v, si les aparece la versión es porque ya esta integrado
(dudo que quede completo así que por las dudas instalenlo pero es para precaución)
