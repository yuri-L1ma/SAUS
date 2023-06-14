var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var salas = require("./routes/salas")
var login = require("./routes/login")
var alunos = require("./routes/alunos")

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())


app.use("/salas/", salas)
app.use("/", login)
app.use("/alunos/", alunos)



module.exports = app;
