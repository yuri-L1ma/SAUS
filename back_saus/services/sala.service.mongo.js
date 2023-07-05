const SalaModel = require('../models/reservation_system/sala.models.mongo')
const BlocoModel = require('../models/reservation_system/bloco.models.mongo')
const MaterialModel = require('../models/reservation_system/material.models.mongo')


class SalaService {
    static listar(req, res) {
        //BlocoModel.find().populate('salas')
        SalaModel.find()
        .populate('bloco')
        .populate('materiais')
        .populate('periodos')
            .then(
                (salas) => {
                    res.status(200).json(salas)
                }
            )
            .catch(err => res.status(500).json(err))
    }

    static criar(req, res) {

        SalaModel.create(req.body)
            .then(
                (sala) => {
                    MaterialModel.create(req.body.materiais)

                    BlocoModel.findByIdAndUpdate(
                        req.body.bloco,
                        { $push: { salas: sala._id } },
                        { new: true }
                    )   .populate('salas')
                        .then(
                            (bloco) => {
                                res.status(201).json(bloco)
                            }
                        )
                        .catch(err => res.status(500).json(err))
                //res.status(201).json(sala)
                }
            )
            .catch(err => res.status(500).json(err))
    }

    static retrieve(req, res) {
        SalaModel.findById(req.params.id)
            .then(
                (sala) => {
                    res.status(200).json(sala)
                }
            )
            .catch(err => res.status(500).json(err))
    }

    static atualizar(req, res) {
        SalaModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )
            .then(
                (sala) => {
                    res.status(200).json(sala)
                }
            )
            .catch(err => res.status(500).json(err))
    }

    static remover(req, res) {
        SalaModel.findByIdAndRemove(req.params.id)
            .then(
                (sala) => {
                    res.status(200).json(sala)
                }
            )
            .catch(err => res.status(500).json(err))
    }
}

module.exports = SalaService