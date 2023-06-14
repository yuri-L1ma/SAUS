var express = require('express');
var router = express.Router();
var salaService = require("../services/sala.service")


router.get(
    "/listar"
    ,
    (req, res, next) => {
        res.json(salaService.listar())
    }
)


router.post (
    "/reserva/:id"
    ,
    (req, res, next) => {
        const sala = salaService.reservar(req.params.id, req.body)
        res.json(sala)
    }
)

module.exports = router;
