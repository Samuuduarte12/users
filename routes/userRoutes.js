/* Aca se definen las rutas que usa la API enlazadas las URLs con los controladores */

// Importa Express para poder usar su sistema de enrutamiento
const express = require("express");

const router = express.Router(); // Crea una instancia del router de Express para definir rutas específicas

const { createUsuario, listarUsuarios } = require("../controllers/userController"); // Importa los controladores que manejan la lógica de cada ruta

router.post("/users", createUsuario); // Ruta POST /users -> crea un nuevo usuario

router.get("/users", listarUsuarios); // Ruta GET /users -> lista todos los usuarios

module.exports = router; // Exporta el router para usarlo en el archivo principal (app.js)
