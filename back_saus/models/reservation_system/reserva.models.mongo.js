var mongoose = require('mongoose')


var ReservaSchema = new mongoose.Schema(
    {
        atividade: { type: String, required: true },
        justificativa: { type: String, required: true },
        sala: { type: mongoose.Schema.Types.ObjectId, ref: 'salas', required: true },
        solicitante: { type: mongoose.Schema.Types.ObjectId, ref: 'alunos', required: true },
        qtdAlunos: { type: Number, required: true, min: 3, max: 60 },
        ativa: { type: Boolean, required: true },
        dias: [{ type: mongoose.Schema.Types.ObjectId, ref: 'dias', required: true }],
        //queixas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'queixas', required: false }]
    }
)

var ReservaModel = mongoose.model('reservas', ReservaSchema)

module.exports = ReservaModel