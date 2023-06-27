var express = require('express');
var router = express.Router();
var periodoServiceMongo = require("../services/periodo.service.mongo")


router.get("/listar", (req, res, next) => {
    periodoServiceMongo.listar(req, res)
})

router.post("/criar", (req, res, next) => {
    periodoServiceMongo.criar(req, res)
})


module.exports = router;