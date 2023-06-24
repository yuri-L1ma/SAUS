const MaterialModel = require('../models/reservation_system/material.models.mongo')

class MaterialService {

    static criar(req, res) {
        MaterialModel.create(req.body)
            .then(
                (material) => {
                    res.status(201).json(material)
                }
            )
            .catch(err => res.status(500).json(err))
    }

    static listar(req, res) {
        MaterialModel.find()
            .then(
                (materiais) => {
                    res.status(200).json(materiais)
                }
            )
            .catch(err => res.status(500).json(err))
    }
    
}

module.exports = MaterialService