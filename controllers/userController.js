const User = require("../models/usersModel");
const bcript = require("bcrypt");

const createUsuario = async (req, res) => {
    const {name, email, password} = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({message: "Tdos los campos son obligatorios"})
    }
    try {
        const existeUsuario = await User.findOne({email});
        if (existeUsuario) {
            return res.status(400).json({message: "Email ya existe"});
        }
        const hash = await bcript.hash(password, 10);
        const nuevoUsuario = await User.create({name, email, password:hash});
        const {_id, name:nameUsuairo, email:emailUsuario} = nuevoUsuario;
        res.status(201).json({message: "Usuario creado con exito", usuario:{id: _id,name:nameUsuairo, email:emailUsuario}});        
    } catch (error) {
        res.status(500).json({mensaje:"Error al crear un usuario", error: error.mensaje})
    }
}

const listarUsuarios = async (req, res) => {
    try {
        const usuarios = await User.find({}, "-password");
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({msg:"Error al listar usuarios", error:error.msg})
    }
}
module.exports = {createUsuario, listarUsuarios};