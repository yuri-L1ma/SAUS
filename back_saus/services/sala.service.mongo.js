const SalaModel = require('../models/reservation_system/sala.models.mongo')
const BlocoModel = require('../models/reservation_system/bloco.models.mongo')
const MaterialModel = require('../models/reservation_system/material.models.mongo')
const ReservaModel = require('../models/reservation_system/reserva.models.mongo')
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
                    reservas: await this.getReservaFuncionante(sala, {dia, hora}),
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
                for(let dia of reserva.dias){
                    if(dia.dia === data.dia){
                        for(let turno of dia.turnos){
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

    static async getReservaFuncionante(sala, data) {
        try {
            let reservas = await ReservaModel.find({ _id: { $in: sala.reservas } }).populate({ path: 'dias', populate: 'turnos' })
            
            reservas = reservas.filter(reserva => reserva.ativa === true)
            
            let response = reservas

            for (let reserva of reservas) {
                for(let dia of reserva.dias){
                    if(dia.dia === data.dia){
                        for(let turno of dia.turnos){
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