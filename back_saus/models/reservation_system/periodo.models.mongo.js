var mongoose = require('mongoose')

var PeriodoSchema = new mongoose.Schema(
    {
        dias: [{ type: Date, required: true }],
        turno: { type: mongoose.Schema.Types.ObjectId, ref: 'turnos', required: true }, 
    }
)


var PeriodoModel = mongoose.model('periodos', PeriodoSchema)

module.exports = PeriodoModel