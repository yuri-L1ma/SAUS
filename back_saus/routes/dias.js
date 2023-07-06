var express = require('express');
var router = express.Router();
var diasServiceMongo = require("../services/dias.service.mongo")


router.get("/listar", (req, res, next) => {
    diasServiceMongo.listar(req, res)
})

router.post("/criar", (req, res, next) => {
    diasServiceMongo.criar(req, res)
})


module.exports = router;