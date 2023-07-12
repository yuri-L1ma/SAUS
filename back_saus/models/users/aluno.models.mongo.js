var mongoose = require("mongoose");
var UsuarioModel = require("./usuario.models.mongo")


var AlunoSchema = new mongoose.Schema(
    {
        user: UsuarioModel.schema,
        matricula: { type: Number, required: true },
        curso: { type: String, required: true },
        semestre: { type: Number, required: true },
        //reservas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'reservas', required: false }]
    }
)


var AlunoModel = mongoose.model("alunos", AlunoSchema)

module.exports = AlunoModel