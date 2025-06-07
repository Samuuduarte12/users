const mogoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
    try {
        await mogoose.connect(process.env.MONGO_URI);
        console.log("MongoDB conectado con suceso!!");        
    } catch (error) {
        console.error("Error al conectar mongodb", error);        
        process.exit(1);
    }    
}

module.exports = connectDB;