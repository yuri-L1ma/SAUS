var mongoose = require('mongoose')
var MaterialModel = require('./material.models.mongo')
const ReservaModel = require('./reserva.models.mongo')

var SalaSchema = new mongoose.Schema(
    {
        nome: { type: String, required: true },
        bloco: { type: mongoose.Schema.Types.ObjectId, ref: 'blocos', required: true },
        capacidade: { type: Number, required: true, min: 0, max: 250 },
        reservas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'reservas', required: false }],
        materiais: [MaterialModel.schema],
    },
    { toJSON: { virtuals: true } }
)

SalaSchema.virtual('disponivel').get(
    async function () {
        if (this.reservas.length > 0) {
            let sala = await this.populate('reservas')
            console.log(sala.reservas)
            return sala.reservas
        } else {
            return false
        }
    })


var SalaModel = mongoose.model('salas', SalaSchema)

module.exports = SalaModel