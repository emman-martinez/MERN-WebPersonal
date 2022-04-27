// Configuración básica de Express
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { API_VERSION } = require('./config');
const { dbConnection } = require('./database/config');

// Crear el servidor de express
const app = express();

// Base de Datos
dbConnection();

// CORS
app.use(cors());

// Directorio Público
app.use(express.static('public'));
// Lectura y parseo del body
app.use(express.json());

// Rutas
// TODO: Auth => Crear, Login, Renew
app.use(`/api/${ API_VERSION }/auth`, require('./routes/auth'));

// TODO: Courses
app.use(`/api/${ API_VERSION }/courses`, require('./routes/courses'));

// TODO: CRUD: Menú
app.use(`/api/${ API_VERSION }/menu`, require('./routes/menu'));

// TODO: C => Newsletter
app.use(`/api/${ API_VERSION }/newsletter`, require('./routes/newsletter'));

// TODO: CRUD: Posts
app.use(`/api/${ API_VERSION }/posts`, require('./routes/post'));

// TODO: CRUD: Users
app.use(`/api/${ API_VERSION }/users`, require('./routes/users'));

// Escuchar Peticiones
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});