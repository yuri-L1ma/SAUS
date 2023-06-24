var mongoose = require('mongoose')

var UsuarioSchema = new mongoose.Schema(
    {
        nome: { type: String, required: true },
        email: { type: String, required: true },
        senha: { type: String, required: true }
    }
)


var UsuarioModel = mongoose.model('usuarios', UsuarioSchema)

module.exports = UsuarioModel