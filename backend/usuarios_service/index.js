// Mostrar microservicios
const express = require('express');
const cors = require('cors');
const app = express();
const PUERTO = 5002;
let urlApp=" http://localhost:4200/"

app.use(express.json());
app.use(cors({origin: urlApp}))
app.use('/api/v1', require('./rutas/usuarios'))

app.listen(PUERTO, ()=>{
    console.log('Servidor funcionando')
});