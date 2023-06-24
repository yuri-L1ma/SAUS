const BlocoModel = require('../models/reservation_system/bloco.models.mongo')


class BlocoService {
    static listar(req, res) {
        //BlocoModel.find().populate('salas')
        BlocoModel.find().populate('salas')
            .then(
                (blocos) => {
                    res.status(200).json(blocos)
                }
            )
            .catch(err => res.status(500).json(err))
    }

    static criar(req, res) {
        BlocoModel.create(req.body)
            .then(
                (bloco) => {
                    res.status(201).json(bloco)
                }
            )
            .catch(err => res.status(500).json(err))
    }

    static retrieve(req, res) {
        BlocoModel.findById(req.params.id)
            .then(
                (bloco) => {
                    res.status(200).json(bloco)
                }
            )
            .catch(err => res.status(500).json(err))
    }

    static atualizar(req, res) {
        BlocoModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )
            .then(
                (bloco) => {
                    res.status(200).json(bloco)
                }
            )
            .catch(err => res.status(500).json(err))
    }

    static remover(req, res) {
        BlocoModel.findByIdAndRemove(req.params.id)
            .then(
                (bloco) => {
                    res.status(200).json(bloco)
                }
            )
            .catch(err => res.status(500).json(err))
    }
}

module.exports = BlocoService
