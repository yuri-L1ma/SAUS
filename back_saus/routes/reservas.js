var express = require('express');
var router = express.Router();
var reservaServiceMongo = require("../services/reserva.service.mongo")

router.get('/listar', (req, res, next) => {
    reservaServiceMongo.listar(req, res)
})

router.get('/retrieve/:id', (req, res, next) => {
    reservaServiceMongo.retrieve(req, res)
})

router.post('/criar', (req, res, next) => {
    reservaServiceMongo.criar(req, res)
})

router.put('/atualizar/:id', (req, res, next) => {
    reservaServiceMongo.atualizar(req, res)
})

router.delete('/remover/:id', (req, res, next) => {
    reservaServiceMongo.remover(req, res)
})

module.exports = router;