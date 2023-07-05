const PeriodoModel = require('../models/reservation_system/periodo.models.mongo');


class PeriodoService {
    static listar(req, res) {
        PeriodoModel.find().populate('turnos')
            .then(
                (periodos) => {
                    res.status(200).json(periodos);
                }
            )
            .catch(err => res.status(500).json(err));
    }


    static criar(req, res) {
        PeriodoModel.create(req.body)
            .then(
                (periodo) => {
                    res.status(201).json(periodo) ;
                }
            )
            .catch(err => res.status(500).json(err));
    }
}

module.exports = PeriodoService;