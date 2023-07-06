const DiasModel = require('../models/reservation_system/dias.models.mongo');


class DiasService {
    static listar(req, res) {
        DiasModel.find().populate('turnos')
            .then(
                (Dias) => {
                    res.status(200).json(Dias);
                }
            )
            .catch(err => res.status(500).json(err));
    }


    static criar(req, res) {
        DiasModel.create(req.body)
            .then(
                (Dias) => {
                    res.status(201).json(Dias) ;
                }
            )
            .catch(err => res.status(500).json(err));
    }
}

module.exports = DiasService;