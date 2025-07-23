// Mostrar microservicios

const express = require('express');
const cors = require('cors');
const app = express();
const PUERTO = 5002;

// URL del frontend
let urlApp = "http://localhost:4200/";

// Middleware para permitir solicitudes del frontend Angular
app.use(cors({ origin: urlApp }));

// Middleware para procesar JSON recibido desde Angular
app.use(express.json());

// Cargar rutas del microservicio tareas
app.use('/api/v1', require('./rutas/tareas'));

// Levantar el servidor
app.listen(PUERTO, () => {
    console.log(`Servidor funcionando en el puerto ${PUERTO}`);
});
