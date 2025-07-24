
# Sistema de Gestión de Tareas – Fullstack

Este proyecto es una aplicación completa (fullstack) para la gestión de tareas. Está dividida en dos partes principales:

- Backend: API REST desarrollada en Node.js con Express y MySQL.
- Frontend: Aplicación web construida con Angular.

## Requisitos Previos

Antes de ejecutar el sistema, asegúrate de tener instalado lo siguiente:

Node.js (versión 14 o superior)  
Angular CLI (versión 15 o superior)  
MySQL Server  
Un cliente de API como Postman (opcional)

## Estructura del Proyecto

mi-proyecto/  
├── backend/ (servicio Node.js Express)  
│   └── tareas_service/
|   └── usuarios_service/ 
├── frontend/  
    └── tareas_service/
    └── usuarios_service/  

## Instalación y Ejecución del Backend

1. Abre una terminal en la carpeta `backend/tareas_service`
2. Instala las dependencias con:

   npm install

3. Crea la base de datos en MySQL con el siguiente comando:

   CREATE DATABASE gestion_servicios;

4. Configura la conexión a MySQL en el archivo `config/db.js`:

   const conexion = mysql.createConnection({
     host: 'localhost',
     user: 'root',
     password: 'contraseña',
     database: 'gestion_servicios'
   });

5. Ejecuta el servidor:

   node index.js

El backend quedará disponible en `http://localhost:4200/`

## Instalación y Ejecución del Frontend

1. Abre una terminal en la carpeta `frontend/tareas_service`
2. Instala las dependencias con:

   npm install

3. Ejecuta el servidor de desarrollo:

   ng serve

La aplicación se ejecutará en `http://localhost:4200/`
Realizar lo mismo para Usuarios_service
## Notas Adicionales

- Asegúrate de que el backend esté ejecutándose antes de probar funcionalidades desde el frontend.
- El frontend consume los servicios RESTful expuestos por el backend.

## Autores

Edison Ariel Vera Intriago  
Maria Jessenia Ganchozo Zambrano
Tecnologías de la Información – UTM
