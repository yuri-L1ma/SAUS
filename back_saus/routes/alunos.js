var express = require('express');
var router = express.Router();
var alunoService = require("../services/aluno.service")
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

module.exports = router