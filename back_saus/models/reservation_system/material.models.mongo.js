var mongoose = require('mongoose')

var MaterialSchema = new mongoose.Schema(
    {
        nome: { type: String, required: true },
        //num_serie: { type: Number, required: true },
        status: { type: Boolean, required: true }
    }
)

var MaterialModel = mongoose.model('materiais', MaterialSchema)

module.exports = MaterialModel