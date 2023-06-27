var express = require('express');
var router = express.Router();
var turnoServiceMongo = require("../services/turno.service.mongo")


router.get("/listar", (req, res, next) => {
    turnoServiceMongo.listar(req, res)
})

router.post("/criar", (req, res, next) => {
    turnoServiceMongo.criar(req, res)
})


module.exports = router;

