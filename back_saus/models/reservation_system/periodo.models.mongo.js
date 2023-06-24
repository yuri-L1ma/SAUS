var mongoose = require('mongoose')

var PeriodoSchema = new mongoose.Schema(
    {
        dia: { type: Date, required: true },
        turnos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'turnos', required: true }]
    }
)


var PeriodoModel = mongoose.model('periodos', PeriodoSchema)

module.exports = PeriodoModel