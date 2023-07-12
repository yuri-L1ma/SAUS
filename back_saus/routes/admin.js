var express = require('express');
var router = express.Router();
var loginAdminService = require ("../services/admin.login.service.mongo")
var adminService = require ("../services/admin.service.mongo")

router.post(
    "/login",
    (req, res, next) => {
        console.log(req.body)
        loginAdminService.Logar(req.body, res)
    }
)

router.post(
    "/cadastrar",
    (req, res, next) => {
        adminService.cadastrar(req, res)
    }
)

router.get(
    "/retrieve/:id",
    (req, res, next) => {
        adminService.retrieve(req, res)
    }
)

router.put(
    "/atualizar/:id",
    (req, res, next) => {
        adminService.atualizar(req, res)
    }
)


module.exports = router