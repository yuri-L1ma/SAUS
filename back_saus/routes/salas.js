var express = require('express');
var router = express.Router();
var salaServiceMongo = require("../services/sala.service.mongo")


router.get(
    "/listar"
    ,
    (req, res, next) => {
        salaServiceMongo.listar(req, res)
    }
)

router.post(
    "/criar"
    ,
    (req, res, next) => {
        salaServiceMongo.criar(req, res)
    }
)


router.get(
    "/retrieve/:id"
    ,
    (req, res, next) => {
        salaServiceMongo.retrieve(req, res)
    }
)

router.put(
    "/atualizar/:id"
    ,
    (req, res, next) => {
        salaServiceMongo.atualizar(req, res)
    }
)

router.delete(
    "/remover/:id"
    ,
    (req, res, next) => {
        salaServiceMongo.remover(req, res)
    }
)


module.exports = router;