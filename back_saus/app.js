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

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())


app.use("/salas/", salas)
app.use("/", login)
app.use("/alunos/", alunos)
app.use("/blocos/", blocos)
app.use("/turnos/", turnos)
app.use("/periodos/", periodos)



module.exports = app;
