var express = require('express');
var router = express.Router();

var alunoService = require("../services/aluno.service.mongo")

//VERSÃO SEM MONGOOSE
/*
var alunoService = require("../services/servicesMongo/aluno.service.mongo")
var loginRouter = require ("../routes/login")


router.get(
    "/listar"
    ,
    (req, res, next) => {
        res.json(alunoService.listar())
    }
)

router.get(
    "/minhasReservas/:matricula"
    ,
    (req, res, next) => {
        res.json(alunoService.verReservas(req.params.matricula))
    }
)
*/

//VERSÃO COM MONGOOSE --- Colocar Abaixo daqui

/*
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
*/

router.get(
    "/listar"
    ,
    (req, res, next) => {
        alunoService.listar(req, res)
    }
)

router.post(
    "/cadastrar",
    (req, res, next) => {
        alunoService.cadastrar(req, res)
    }
)

router.get(
    "/retrieve/:id"
    ,
    (req, res, next) => {
        alunoService.retrieve(req, res)
    }
)

router.get(
    "/retrievematricula/:matricula"
    ,
    (req, res, next) => {
        alunoService.retrieveByMatricula(req, res)
    }
)

router.put(
    "/atualizar/:id"
    ,
    (req, res, next) => {
        alunoService.atualizar(req, res)
    }
)

router.delete(
    "/remover/:id"
    ,
    (req, res, next) => {
        alunoService.remover(req, res)
    }
)

module.exports = router