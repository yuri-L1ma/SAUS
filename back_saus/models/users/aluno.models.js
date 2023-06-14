const UsuarioModel = require("./usuario.models")

class AlunoModel extends UsuarioModel {

    constructor(nome, email, senha, matricula, curso, semestre, reservas) {
        super(nome, email, senha);
        this.matricula = matricula;
        this.curso = curso;
        this.semestre = semestre;
        this.reservas = reservas;
    }

}


module.exports = AlunoModel