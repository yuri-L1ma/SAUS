var mongoose = require('mongoose')
var MaterialModel = require('./material.models.mongo')

var SalaSchema = new mongoose.Schema(
    {
        nome: { type: String, required: true },
        bloco: { type: mongoose.Schema.Types.ObjectId, ref: 'blocos', required: true },
        disponivel: { type: Boolean, required: true },
        capacidade: { type: Number, required: true, min: 0, max: 250 },
        materiais: [MaterialModel.schema],
        periodos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'periodos', required: false }]
    }
)


var SalaModel = mongoose.model('salas', SalaSchema)

module.exports = SalaModel