var mongoose = require("mongoose")
var UsuarioModel = require("./usuario.models.mongo")

var AdministradorSchema = new mongoose.Schema(
    {
        user: UsuarioModel.schema,
        cpf: { type: String, required: true },
        cargo: { type: String, required: true }
    }
)


var AdministradorModel = mongoose.model("administradores", AdministradorSchema)

module.exports = AdministradorModel