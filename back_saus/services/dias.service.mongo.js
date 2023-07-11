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
        let dias = req.body.dias;
        console.log(dias);
        
        DiasModel.insertMany(dias)
            .then(
                (Dias) => {
                    res.status(201).json(Dias) ;
                }
            )
            .catch(err => res.status(500).json(err));
    }
}

module.exports = DiasService;