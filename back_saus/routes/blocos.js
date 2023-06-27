var express = require('express');
var router = express.Router();
var blocoServiceMongo = require("../services/bloco.service.mongo")


router.get("/listar", (req, res, next) => {
    blocoServiceMongo.listar(req, res)
})

router.post("/criar", (req, res, next) => {
    blocoServiceMongo.criar(req, res)
})

router.get("/retrieve/:id", (req, res, next) => {
    blocoServiceMongo.retrieve(req, res)
})

router.put("/atualizar/:id", (req, res, next) => {
    blocoServiceMongo.atualizar(req, res)
})

router.delete("/remover/:id", (req, res, next) => {
    blocoServiceMongo.remover(req, res)
})

module.exports = router;
