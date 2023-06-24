var express = require('express');
var router = express.Router();

// VERSÃO GAMBIARRA
// var loginService = require("../services/login.service")


// router.post(
//     "/login"
//     ,
//     (req, res, next) => {
//         const usuario = loginService.Logar(req.body)
//         res.json(usuario)

//         if (usuario === "Usuário não está cadastrado!") {
//             res.status(401).json({ message: 'Usuário não está cadastrado!' })
//         }
//     }
// )

//VERSÃO COM MONGOOSE --- Colocar abaixo daqui

module.exports = router;