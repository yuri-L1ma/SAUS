const TurnoModel = require('../models/reservation_system/turno.models.mongo');

class TurnoService {
    static listar(req, res) {
        TurnoModel.find()
            .then(
                (turnos) => {
                    res.status(200).json(turnos);
                }
            )
            .catch(err => res.status(500).json(err));
    }

    static criar(req, res) {
        TurnoModel.create(req.body)
            .then(
                (turno) => {
                    res.status(201).json(turno);
                }
            )
            .catch(err => res.status(500).json(err));
    }
}

module.exports = TurnoService;
