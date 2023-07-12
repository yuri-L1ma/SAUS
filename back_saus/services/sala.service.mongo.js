const SalaModel = require('../models/reservation_system/sala.models.mongo')
const BlocoModel = require('../models/reservation_system/bloco.models.mongo')
const MaterialModel = require('../models/reservation_system/material.models.mongo')
const ReservaModel = require('../models/reservation_system/reserva.models.mongo')
const DiasModel = require('../models/reservation_system/dias.models.mongo')
const moment = require('moment')

class SalaService {

    static async listar(req, res) {
        let bloco = req.params.bloco
        let dia = req.params.dia
        let hora = parseInt(req.params.hora)

        // console.log(bloco, dia, hora)

        SalaModel.find({ bloco }).populate('bloco').populate('materiais').then(async (salasDB) => {
            const salas = await Promise.all(salasDB.map(async (sala) => {
                return {
                    ...sala.toJSON(),
                    reserva: await this.getReservaFuncionante(sala, { dia, hora }),
                    disponivel: await this.isDisponivel(sala, { dia, hora })
                }
            }))
            res.status(200).json(salas)
        })
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
                    ).populate('salas')
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

    static async isDisponivel(sala, data) {
        try {
            let reservas = await ReservaModel.find({ _id: { $in: sala.reservas } }).populate({ path: 'dias', populate: 'turnos' })
            let response = true

            reservas = reservas.filter(reserva => reserva.ativa === true)

            for (let reserva of reservas) {
                for (let dia of reserva.dias) {
                    if (dia.dia === data.dia) {
                        for (let turno of dia.turnos) {
                            if (data.hora >= turno.comeco && data.hora <= turno.fim) {
                                response = false
                            }
                        }
                    }
                }
            }

            return response
        } catch (err) {
            console.log(err)
        }
    }

    static async hasReserva(req, res) {
        // let sala_id = req.params.id;
        // let diaPesquisado = req.params.dia;
        // let turnoPesquisado = req.params.turno;
        let { sala, dias } = req.body;

        console.log(dias)

        try {
            const reservas = await ReservaModel.find({ sala }).populate(
                'dias',
            );

            const reservaEncontrada = reservas.find((r) => {
                for (let diaPesquisado of dias) {
                    for (let diaReserva of r.dias) {
                        if (diaReserva.dia === diaPesquisado.dia) {
                            for (let turnoPesquisado of diaPesquisado.turnos) {
                                if (diaReserva.turnos.includes(turnoPesquisado._id)) {
                                    return r
                                }
                            }
                        }
                    }
                }
            });

            console.log(reservaEncontrada)

            if (!reservaEncontrada) {
                res.status(400).json({ error: 'DEU MUITO ERRADO' });
            }

            res.status(200).json(reservaEncontrada);
        } catch (err) {
            console.log('O ERRO FOI', err);
            res.status(400).json({ error: 'DEU MUITO ERRADO' });
        }
    }

    static async getReservaFuncionante(sala, data) {
        try {
            let reservas = await ReservaModel.find({ _id: { $in: sala.reservas } }).populate({ path: 'solicitante' }).populate({ path: 'dias', populate: 'turnos' }).populate({ path: 'sala', populate: 'bloco' })

            reservas = reservas.filter(reserva => reserva.ativa === true)

            let response = reservas

            for (let reserva of reservas) {
                for (let dia of reserva.dias) {
                    if (dia.dia === data.dia) {
                        for (let turno of dia.turnos) {
                            if (data.hora >= turno.comeco && data.hora <= turno.fim) {
                                response = reserva
                            }
                        }
                    }
                }
            }

            return response
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = SalaService