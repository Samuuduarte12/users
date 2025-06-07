const express = require("express")
const router = express.Router();
const {createUsuario, listarUsuarios} = require("../controllers/userController");

router.post("/users",createUsuario);
router.get("/users", listarUsuarios);

module.exports = router;