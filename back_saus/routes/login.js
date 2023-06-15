var express = require('express');
//var session = require('express-session')

var router = express.Router();
var loginService = require("../services/login.service")

//var salas = require("./routes/salas")

// router.get(
//     "/"
//     ,
//     (req, res, next) => {
//         res.send("Hello World")
//     }
// )


router.post(
    "/login"
    ,
    (req, res, next) => {
        const usuario = loginService.Logar(req.body)
        res.json(usuario)

        if (usuario === "Usuário não está cadastrado!") {
            res.status(401).json({ message: 'Usuário não está cadastrado!' })
        }
    }
)

module.exports = router;