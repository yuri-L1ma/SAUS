var mongoose = require('mongoose')

var DiasSchema = new mongoose.Schema(
    {
        dia: { type: String, required: true },
        turnos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'turnos', required: true }], 
    }
)


var DiasModel = mongoose.model('dias', DiasSchema)

module.exports = DiasModel