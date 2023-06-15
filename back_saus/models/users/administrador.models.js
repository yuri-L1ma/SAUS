const UsuarioModel = require("./usuario.models")

class AdministradorModel extends UsuarioModel {

    constructor(nome, sobrenome, foto, email, senha, cpf, cargo) {
        super(nome, sobrenome, foto, email, senha,)
        this.cpf = cpf
        this.cargo = cargo
    }

}

module.exports = AdministradorModel