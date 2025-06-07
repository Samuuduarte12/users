/* Aca contiene los modelos o esgtructuras de datos de MongoDB, cada archivo representa una coleccion */
/* este es el modelo de user y define name, email, password */

const mongoose = require("mongoose"); // Importa mongoose para definir esquemas y modelos de MongoDB

const userSchema = new mongoose.Schema({
    // Campo name: tipo String, obligatorio con mensaje personalizado
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    
    // Campo email: tipo String, obligatorio, único en la base de datos
    email: {
        type: String,
        required: [true, 'Email es obligatorio'],
        unique: true
    },

    // Campo password: tipo String, obligatorio
    password: {
        type: String,
        required: [true, 'Contraseña obligatoria']
    },
},
{
    timestamps: true, // Añade automáticamente campos createdAt y updatedAt a los documentos
});

module.exports = mongoose.model("User", userSchema); // Crea y exporta el modelo de usuario usando el esquema definido