const ReservaModel = require('../models/reservation_system/reserva.models.mongo')
const SalaModel = require('../models/reservation_system/sala.models.mongo')

class ReservaService {
    static listar(req, res) {
        ReservaModel.find().populate({path: 'periodo', populate: {path: 'turno'} }).populate({path: 'sala', populate: {path: 'bloco'} })
            .then(
                (reservas) => {
                    res.status(200).json(reservas)
                }
            )
            .catch(err => res.status(500).json(err))
    }

    static criar(req, res) {
        ReservaModel.create(req.body)
            .then(
                (reserva) => {
                    SalaModel.findByIdAndUpdate(reserva.sala._id, { $push: { reservas: reserva._id } }).then(
                        res.status(201).json(reserva)
                    ).catch(err => res.status(500).json(err))
                }
            )
            .catch(err => res.status(500).json(err))
    }

    static retrieve(req, res) {
        ReservaModel.findById(req.params.id)
            .then(
                (reserva) => {
                    res.status(200).json(reserva)
                }
            )
            .catch(err => res.status(500).json(err))
    }

    static atualizar(req, res) {
        ReservaModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )
            .then(
                (reserva) => {
                    res.status(200).json(reserva)
                }
            )
            .catch(err => res.status(500).json(err))
    }

    static remover(req, res) {
        ReservaModel.findByIdAndRemove(req.params.id)
            .then(
                (reserva) => {
                    res.status(200).json(reserva)
                }
            )
            .catch(err => res.status(500).json(err))
    }

    static reservasPorAluno(req, res) {
        ReservaModel.find({solicitante: req.params.id}).populate({path: 'dias', populate: {path: 'turnos'} }).populate({path: 'sala', populate: {path: 'bloco'} })
            .then(
                (reservas) => {
                    res.status(200).json(reservas)
                }
            )
            .catch(err => res.status(500).json(err))
    }
}

module.exports = ReservaService;