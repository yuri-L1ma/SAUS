const SalaModel = require('../models/reservation_system/sala.models.mongo')
const BlocoModel = require('../models/reservation_system/bloco.models.mongo')
const MaterialModel = require('../models/reservation_system/material.models.mongo')
const ReservaModel = require('../models/reservation_system/reserva.models.mongo')
const moment = require('moment')

class SalaService {

    static async listar(req, res) {
        //BlocoModel.find().populate('salas')
        let bloco = req.params.bloco
        SalaModel.find({ bloco }).populate('bloco').populate('materiais').then(async (salasDB) => {
            const dia = moment().format('dddd').toLowerCase()
            const hora = date.getHours()
            const salas = await Promise.all(salasDB.map(async (sala) => {
                return {
                    ...sala.toJSON(),
                    disponivel: await this.isDisponivel(sala, new Date())
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
        try{
            let reservas = await ReservaModel.find({ _id: { $in: sala.reservas } }).populate({path: 'periodo', populate: 'turno'})
            reservas = reservas.filter(reserva => reserva.ativa)
            for(reserva of reservas){
                if(reserva.periodo.dias.include(data.dia)){
                    if(data.hora >= reserva.periodo.turno.comeco && data.hora <= reserva.periodo.turno.fim){
                        return true
                    }else{
                        return false
                    }
                }else{
                    return false
                }
            }
            return false
        }catch{
            return false
        }
    }
}

module.exports = SalaService