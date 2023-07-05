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
var admin = require("./routes/admin")

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
app.use("/admin/", admin)
//db.administradores.insertOne({"user":{"nome":"tabata", "email":"tabataadmin@admin@gmail.com", "senha":"tabata134"}, "cpf":"12345678999", "cargo":"secretraria"})
//db.administradores.insertOne({"user":{"nome":"cleide", "email":"cleide@admin@gmail.com", "senha":"clede12"}, "cpf":"1234555999", "cargo":"secretraria"})
//db.administradores.insertOne({"user":{"nome":"damares", "email":"damares@admin@gmail.com", "senha":"damares12"}, "cpf":"123411999", "cargo":"secretraria"})
//db.administradores.insertOne({"user":{"nome":"bruno", "email":"bruno@admin@gmail.com", "senha":"b2022"}, "cpf":"123412299", "cargo":"secretraria"})
//db.administradores.insertOne({"user":{"nome":"jenifer", "email":"jeni@admin@gmail.com", "senha":"b2022"}, "cpf":"123414299", "cargo":"secretraria"})


module.exports = app;
