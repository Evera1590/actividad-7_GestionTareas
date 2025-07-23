// Base de datos
const mysql = require('mysql2/promise');

const conexion = mysql.createPool({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "edisonV04@.2025",
    database: "gestion_servicios"
});

module.exports = conexion;