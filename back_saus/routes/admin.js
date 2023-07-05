var express = require('express');
var router = express.Router();
const LoginAdminService = require ("../services/admin.login.service")

router.post(
    "/login",
    (req, res, next) => {
        console.log(req.body)
        LoginAdminService.Logar(req.body, res)
    }
)
module.exports = router