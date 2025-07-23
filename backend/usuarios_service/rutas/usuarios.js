const express = require('express');
const rutas = express.Router();
const conexion = require('../config/db');

// Verificar conexión (opcional)
(async () => {
  try {
    const c = await conexion.getConnection();
    c.release();
    console.log('Conexión a la base de datos exitosa');
  } catch (error) {
    console.log('Ocurrió un error al conectar a la base de datos:', error.message);
  }
})();

// GET todos los usuarios
rutas.get('/usuarios', async (req, res) => {
  try {
    const [datos] = await conexion.query('SELECT * FROM usuarios');
    res.status(200).json({ usuarios: datos });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "No se pudieron obtener los usuarios" });
  }
});

// GET usuario por ID
rutas.get('/usuarios/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const [datos] = await conexion.query('SELECT * FROM usuarios WHERE id = ?', [id]);
    if (datos.length === 0) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }
    res.status(200).json(datos[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send('Ocurrió un error');
  }
});

// POST - Crear usuario
rutas.post('/usuarios', async (req, res) => {
  try {
    const { nombre, correo, contraseña } = req.body;
    await conexion.query(
      'INSERT INTO usuarios (nombre, correo, contraseña) VALUES (?, ?, ?)',
      [ nombre, correo, contraseña]
    );
    res.status(200).send({ msg: "Usuario creado exitosamente." });
  } catch (error) {
    console.log(error);
    res.status(500).send('Ocurrió un error');
  }
});

// PUT - Actualizar usuario
rutas.put('/usuarios/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { nombre, correo, contraseña } = req.body;

    await conexion.query(
      'UPDATE usuarios SET nombre = ?, correo = ?, contraseña = ? WHERE id = ?',
      [nombre, correo, contraseña, id]
    );
    res.status(200).json({ msg: 'Usuario actualizado correctamente.' });
  } catch (error) {
    console.log(error);
    res.status(500).send('Ocurrió un error');
  }
});

// DELETE - Eliminar usuario
rutas.delete('/usuarios/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await conexion.query('DELETE FROM usuarios WHERE id = ?', [id]);
    res.status(200).json({ msg: "Usuario eliminado correctamente." });
  } catch (error) {
    console.log(error);
    res.status(500).send('Ocurrió un error');
  }
});

module.exports = rutas;




/*const express = require('express');
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

// GET: Obtener todos los usuarios
rutas.get('/usuarios', async (req, res) => {
    try {
        const datos = await conexion.query('SELECT * FROM usuarios;');
        res.status(200).json(datos[0]);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al obtener los usuarios.');
    }
});

// GET: Obtener usuario por ID
rutas.get('/usuarios/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const datos = await conexion.query(
            'SELECT * FROM usuarios WHERE id = ?',
            [id]
        );
        res.status(200).json(datos[0][0]);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al obtener el usuario.');
    }
});

// POST: Crear nuevo usuario
rutas.post('/usuarios', async (req, res) => {
    try {
        const { id, nombre, correo, contraseña } = req.body;
        await conexion.query(
            'INSERT INTO usuarios (id,nombre, correo, contraseña) VALUES (?, ?, ?, ?)',
            [id, nombre, correo, contraseña]
        );
        res.status(201).json({ msg: 'Usuario agregado correctamente.' });
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al agregar el usuario.');
    }
});

// DELETE: Eliminar usuario por ID
rutas.delete('/usuarios/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await conexion.query('DELETE FROM usuarios WHERE id = ?', [id]);
        res.status(200).json({ msg: "Usuario eliminado correctamente." });
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al eliminar el usuario.');
    }
});

// PUT: Actualizar usuario por ID
rutas.put('/usuarios/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { nombre, correo, contraseña } = req.body;

        await conexion.query(
            'UPDATE usuarios SET nombre = ?, correo = ?, contraseña = ? WHERE id = ?',
            [nombre, correo, contraseña, id]
        );
        res.status(200).json({ msg: 'Usuario actualizado correctamente.' });
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al actualizar el usuario.');
    }
});

module.exports = rutas;
*/

