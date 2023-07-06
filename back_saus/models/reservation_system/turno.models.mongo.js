var mongoose = require('mongoose')

var TurnoSchema = new mongoose.Schema(
    {
        nome: { type: String, required: true },
        comeco: { type: Number, required: true },
        fim: { type: Number, required: true }
    }
)


var TurnoModel = mongoose.model('turnos', TurnoSchema)

module.exports = TurnoModel