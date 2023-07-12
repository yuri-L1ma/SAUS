const AdminModel = require('../models/users/administrador.models.mongo')
const UsuarioModel = require('../models/users/usuario.models.mongo')

class AdminService {

    static cadastrar(req, res) {

        UsuarioModel.create(req.body.user)

        AdminModel.create(req.body)
            .then(
                (admin) => {
                    res.status(201).json(admin)
                }
            )
            .catch(
                (erro) => {
                    res.status(500).json(erro)
                }
            )
    }

    static retrieve(req, res) {
        console.log(req.params.id)
        AdminModel.findById(req.params.id)
            .then(
                (admin) => {
                    res.status(200).json({"id": admin._id, "nome": admin.user.nome, "email": admin.user.email, "senha": admin.user.senha, "cpf": admin.cpf, "cargo": admin.cargo })
                }
            )
            .catch(err => res.status(500).json(err))

    }

    static atualizar(req, res) {

        AdminModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )
            .then(
                (admin) => {
                    res.status(200).json({"id": admin._id, "nome": admin.user.nome, "email": admin.user.email, "senha": admin.user.senha, "cpf": admin.cpf, "cargo": admin.cargo })
                }
            )
            .catch(err => res.status(500).json(err))


    }

}

module.exports = AdminService