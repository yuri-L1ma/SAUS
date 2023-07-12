const adminModel = require("../models/users/administrador.models.mongo")


class LoginAdminService {
    static Logar(body, res) {

        const email = body.email
        const senha = body.senha

        const admin = adminModel.findOne({ 'user.email': email }).then(
            (adminEncontrado) => {
                if (adminEncontrado) {
                    console.log(adminEncontrado)
                    if (adminEncontrado.user.email == email && adminEncontrado.user.senha == senha) {
                        res.status(200).json({ "admin": true, "id": adminEncontrado._id, "nome": adminEncontrado.user.nome, "email": adminEncontrado.user.email, "senha": adminEncontrado.user.senha, "cpf": adminEncontrado.cpf, "cargo": adminEncontrado.cargo })
                    } else {
                        res.status(200).json(false)
                    }
                } else {
                    res.status(200).json(false)
                }
            }
        )
            .catch(
                (erro) => {
                    res.status(500).json(erro)
                }
            )
    }
}


module.exports = LoginAdminService