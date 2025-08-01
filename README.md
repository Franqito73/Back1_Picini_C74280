# Proyecto Final Backend-2 C75280

Este proyecto es un backend funcional para un e-commerce, desarrollado con Node.js y Express, que permite gestionar productos, carritos de compras, vistas con Handlebars y persistencia de datos en MongoDB.

## Estructura del proyecto


```
 proyecto/
├──  src/
│   ├──  controllers/
│   ├──  dao/
│   │   └──  managers/
│   ├──  models/
│   ├──  routes/
│   ├──  views/
│   ├──  public/
│   │   └──  css/
│   ├── app.js
│   └── index.js
├── .env
├── .gitignore
├── package.json
└── README.md
```

## Funcionalidades
* CRUD de productos

* CRUD de carritos

* Asociación producto/carrito

* Vistas dinámicas con Handlebars

* Renderizado de detalle de producto

* Agregar productos al carrito desde vista de detalle

* Paginación de productos

* Estructura modular y buenas prácticas de código.

## Tecnologías
* Node.js

* Express.js

* MongoDB con Mongoose

* Handlebars

* HTML y CSS

* JavaScript

## Instalación
* Cloná el repositorio:

```bash
git clone https://github.com/Franqito73/Back1_Picini_C75280
```
* Accede al directorio del proyecto
```bash
cd Back1_Picini_C75280
```
* Instalá las dependencias
```bash
npm i
```
* Configurá tu archivo .env
```ini
PORT=8080
MONGO_URI= mongodb://localhost:27017/ecommerce
```
* Inicia el servidor
```bash
npm run dev
```

## Rutas principales
- `/products` → Vista de productos con paginación
- `/products/:id` → Vista de detalle de producto
- `/cart` → Vista del carrito
- `/api/products` → API REST de productos
- `/api/carts` → API REST de carritos

## 👤 Autor

- 💻 GitHub: [Franqito73](https://github.com/Franqito73)
- ✉️ Email: franco.picini@hotmail.com
