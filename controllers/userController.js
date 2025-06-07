/* aca contiene las funciones que procesan la logica para manejar las peticiones(GET, POST, PUT, DELETE, etc) */

// Importa el modelo de usuario desde la carpeta models
const User = require("../models/usersModel");

// Importa bcrypt para encriptar contraseñas
const bcrypt = require("bcrypt");

// Crea un nuevo usuario en la base de datos
const createUsuario = async (req, res) => {
    const { name, email, password } = req.body;

    // Verifica que todos los campos requeridos estén presentes
    if (!name || !email || !password) {
        return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    try {
        // Verifica si el usuario ya existe por su email
        const existeUsuario = await User.findOne({ email });
        if (existeUsuario) {
            return res.status(400).json({ message: "Email ya existe" });
        }
        
        const hash = await bcrypt.hash(password, 10); // Encripta la contraseña antes de guardarla
        
        const nuevoUsuario = await User.create({ name, email, password: hash }); // Crea un nuevo documento de usuario en la base de datos
        
        const { _id, name: nameUsuario, email: emailUsuario } = nuevoUsuario; // Extrae solo los campos necesarios para la respuesta

        // Devuelve una respuesta con los datos del usuario creado (sin la contraseña)
        res.status(201).json({
            message: "Usuario creado con éxito",
            usuario: {
                id: _id,
                name: nameUsuario,
                email: emailUsuario
            }
        });
    } catch (error) {
        // Devuelve un error si algo falla
        res.status(500).json({
            mensaje: "Error al crear un usuario",
            error: error.message  // Corregido de `error.mensaje` a `error.message`
        });
    }
};

// Lista todos los usuarios registrados (sin incluir la contraseña)
const listarUsuarios = async (req, res) => {
    try {        
        const usuarios = await User.find({}, "-password"); // Busca todos los usuarios y excluye el campo "password"        
        res.json(usuarios); // Devuelve el listado en formato JSON

    } catch (error) {
        // Devuelve un error si algo falla
        res.status(500).json({
            msg: "Error al listar usuarios",
            error: error.message  // Corregido de `error.msg` a `error.message`
        });
    }
};

// Exporta ambas funciones para que puedan ser usadas en las rutas
module.exports = { createUsuario, listarUsuarios };