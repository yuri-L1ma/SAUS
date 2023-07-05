const adminModel = require("../models/users/administrador.models.mongo")


class LoginAdminService {
    static Logar(body, res) {
        const email = body.email
        const senha = body.senha

        const admin = adminModel.findOne({ 'user.email': email }).then(
            (adminEncontrado) => {
                if (adminEncontrado) {
                    console.log(adminEncontrado)
                    if (adminEncontrado.user.email == email && adminEncontrado.user.senha) {
                        res.json({ "admin": true })
                    } else {
                        res.json({ "error": "usuario ou senha errados" })
                    }
                } else {
                    res.json({ "error": "user not found" })
                }
            }
        )
    }
}


module.exports = LoginAdminService
