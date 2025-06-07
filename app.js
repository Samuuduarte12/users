// Importa el framework Express para crear el servidor
const express = require("express");
const app = express();

const cors = require("cors"); // Importa CORS para permitir peticiones desde otros dominios (útil si tu frontend está en otro host)
const connectDB = require("./config/db"); // Importa la función para conectar a la base de datos MongoDB
const userRoutes = require("./routes/userRoutes"); // Importa las rutas de usuario definidas en otro archivo
const swaggerUI = require("swagger-ui-express"); // Importa Swagger UI para mostrar la documentación de la API en una interfaz web
const swaggerDocument = require("./swagger/swagger.json"); // Importa el archivo Swagger JSON con la definición de la documentación
require("dotenv").config(); // Carga las variables de entorno desde el archivo .env

connectDB(); // Conecta a la base de datos MongoDB

app.use(cors()); // Habilita CORS para que otros dominios puedan acceder a tu API

app.use(express.json()); // Habilita el middleware de Express para aceptar datos en formato JSON (req.body)

// Monta la interfaz Swagger en la ruta /api-docs para ver la documentación de tu API
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument)); 

app.use("/", userRoutes); // Usa las rutas definidas en el archivo userRoutes (normalmente prefijadas, como /api/users)

const PORT = process.env.PORT || 3000; // Define el puerto en el que correrá el servidor (desde .env o por defecto 3000)

// Inicia el servidor y muestra un mensaje en consola cuando está listo
app.listen(PORT, () =>{
    console.log(`Servidor ejecutado en el puerto ${PORT}. Acceso: http://localhost:${PORT}/api-docs`);    
});

