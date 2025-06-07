const { default: mongoose } = require("mongoose")
const mogoose = require("mongoose")

const userSchema = new mogoose.Schema({
    name:{type: String, required: [true, 'El nombre es obligatorio']},
    email: {type:String, required: [true, 'Email es obligatorio'], unique: true},     
    password:{type: String, required:[true, 'Contraseña obligatoria']},
},
{
    timestamps:true,    
})

module.exports = mongoose.model("User", userSchema);