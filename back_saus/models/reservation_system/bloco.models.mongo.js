var mongoose = require('mongoose')

var BlocoSchema = new mongoose.Schema(
    {
        numero: { type: Number, required: true },
        descricao: { type: String, required: true },
        salas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'salas', required: false }]
    }
)


var BlocoModel = mongoose.model('blocos', BlocoSchema)

module.exports = BlocoModel