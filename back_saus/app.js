var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

require("./db/mongo.connection")

var salas = require("./routes/salas")
var login = require("./routes/login")
var alunos = require("./routes/alunos")
var blocos = require("./routes/blocos")
var turnos = require("./routes/turnos")
var periodos = require("./routes/periodos")
var reservas = require("./routes/reservas")

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
  })

app.use("/salas/", salas)
app.use("/", login)
app.use("/alunos/", alunos)
app.use("/blocos/", blocos)
app.use("/turnos/", turnos)
app.use("/periodos/", periodos)
app.use("/reservas/", reservas)



module.exports = app;
