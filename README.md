# Proyecto Final Backend-2 C75280

Este proyecto es un backend funcional para un e-commerce, desarrollado con Node.js y Express, que permite gestionar productos, carritos de compras, vistas con Handlebars y persistencia de datos en MongoDB.
Incluye funcionalidades de autenticación JWT, recuperación de contraseña, notificaciones por email y SMS.

## Estructura del proyecto

├── src/
│ ├── config/
│ ├── controllers/
│ ├── dao/
│ ├── dto/
│ ├── middlewares/
│ ├── models/
│ ├── public/
│ │ └── css/
│ ├── repositories/
│ ├── services/
│ ├── routes/
│ ├── utils/
│ ├── views/
│ │ └── layouts/
│ ├── app.js
│ └── index.js
├── .env
├── .env.example
├── .gitignore
├── package.json
└── README.md

## Funcionalidades
CRUD completo de productos con paginación, filtrado y ordenamiento.

CRUD completo de carritos, incluyendo agregar, eliminar y actualizar productos.

Asociación entre productos y carritos, con cantidades ajustables.

Sistema de usuarios con roles (user/admin) para control de accesos.

Autenticación con JWT para proteger rutas.

Middleware de autorización para restringir acceso según roles.

Registro, login y sesión de usuarios con hash de contraseñas.

Recuperación de contraseña vía email, con generación y validación de token temporal.

Notificaciones vía SMS al registrar usuarios (opcional si se provee teléfono).

Vistas dinámicas con Handlebars para mostrar productos, detalle, carrito y demás.

Renderizado de detalle de producto con posibilidad de agregar al carrito desde la vista.

Manejo de errores con middleware dedicado.

Estructura modular y buenas prácticas de código para facilitar mantenimiento y escalabilidad.

## Tecnologías
Node.js

Express.js

MongoDB con Mongoose

JWT para autenticación

bcrypt para encriptación de contraseñas

Nodemailer para envío de emails

Twilio para envío de SMS

Handlebars para vistas

HTML, CSS y JavaScript

## Instalación
* Cloná el repositorio:

```bash
git clone https://github.com/Franqito73/Back1_Picini_C74280

* Accede al directorio del proyecto
```bash
cd Back1_Picini_C74280
```
* Instalá las dependencias
```bash
npm i
```
* Configurá tu archivo .env
```ini
PORT=8080
MONGO_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=tu_clave_secreta
EMAIL_USER=tu_email@gmail.com
EMAIL_PASS=tu_contraseña_de_app_email
TWILIO_ACCOUNT_SID=tu_sid_twilio
TWILIO_AUTH_TOKEN=tu_token_twilio
TWILIO_PHONE_NUMBER=tu_numero_twilio
```
* Inicia el servidor
```bash
npm run dev
```

## Rutas principales
/products → Vista de productos con paginación, filtros y ordenamiento

/products/:id → Vista de detalle de producto

/cart → Vista del carrito

/api/products → API REST para CRUD de productos (admin sólo para creación, actualización y borrado)

/api/carts → API REST para CRUD de carritos y gestión de productos en carrito

/api/sessions/signup → Registro de usuario

/api/sessions/login → Login y obtención de JWT

/api/sessions/current → Obtener usuario actual autenticado

/api/sessions/forgot-password → Solicitar email para recuperar contraseña

/api/sessions/reset-password/:token → Restablecer contraseña con token

## 👤 Autor

- 💻 GitHub: [Franqito73](https://github.com/Franqito73)
- ✉️ Email: franco.picini@hotmail.com
