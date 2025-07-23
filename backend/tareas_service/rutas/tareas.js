//Aquí se manejan las solicitudes HTTP (GET, POST, PUT, DELETE)
//  y se conectan con la lógica de negocio.
const express = require('express');
const rutas = express.Router();
const conexion = require('../config/db');

// Verificar conexión a la base de datos
(async () => {
    try {
        const c = await conexion.getConnection();
        console.log("Conexión establecida con la base de datos.");
    } catch (error) {
        console.log('Ocurrió un error al conectar con la base de datos');
    }
})();

// GET: Obtener todas las tareas
rutas.get('/tareas', async (req, res) => {
    try {
        const datos = await conexion.query('SELECT * FROM tareas;');
        res.status(200).json(datos[0]);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al obtener las tareas.');
    }
});

// GET: Obtener tarea por ID
rutas.get('/tareas/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const datos = await conexion.query(
            'SELECT * FROM tareas WHERE id = ?',
            [id]
        );
        res.status(200).json(datos[0][0]);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al obtener la tarea.');
    }
});

// POST: Crear nueva tarea
rutas.post('/tareas', async (req, res) => {
    try {
        const { titulo, descripcion, estado, usuario_id, fechaVencimiento } = req.body;
        await conexion.query(
            'INSERT INTO tareas (titulo, descripcion, estado, usuario_id, fechaVencimiento) VALUES (?, ?, ?, ?, ?)',
            [titulo, descripcion, estado, usuario_id, fechaVencimiento]
        );
        res.status(200).json({ msg: 'Tarea agregada correctamente.' });
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al agregar la tarea.');
    }
});

// DELETE: Eliminar tarea por ID
rutas.delete('/tareas/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await conexion.query('DELETE FROM tareas WHERE id = ?', [id]);
        res.status(200).json({ msg: "Tarea eliminada correctamente." });
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al eliminar la tarea.');
    }
});

// PUT: Actualizar tarea por ID
rutas.put('/tareas/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { titulo, descripcion, estado, usuario_id, fechaVencimiento } = req.body;

        await conexion.query(
            'UPDATE tareas SET titulo = ?, descripcion = ?, estado = ?, usuario_id = ?, fechaVencimiento = ? WHERE id = ?',
            [titulo, descripcion, estado, usuario_id, fechaVencimiento, id]
        );
        res.status(200).json({ msg: 'Tarea actualizada correctamente.' });
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al actualizar la tarea.');
    }
});

module.exports = rutas;
