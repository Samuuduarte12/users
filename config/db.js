/* Aca se configura y establece la conexion con mongoDB usando mongoose */

// Importa mongoose para conectarse y trabajar con MongoDB
const mongoose = require("mongoose");

// Carga las variables de entorno desde el archivo .env (donde está MONGO_URI)
require("dotenv").config();

// Función asincrónica que se encarga de conectar a la base de datos MongoDB
const connectDB = async () => {
    try {
        // Intenta conectarse a la URI de Mongo usando mongoose
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB conectado con suceso!!");        
    } catch (error) {
        // Si hay un error, lo muestra en consola
        console.error("Error al conectar mongodb", error);
        // Finaliza el proceso de Node.js con un error (código 1)
        process.exit(1);
    }    
}

// Exporta la función connectDB para poder usarla en otros archivos (como app.js)
module.exports = connectDB;